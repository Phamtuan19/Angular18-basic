import { AuthService } from './../../../services/authentication/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { APP_CONFIG } from 'src/app/configs/app.config';
import { IAppConfig } from 'src/app/configs/app.config.interface';
import { LoginData } from 'src/app/services/authentication/auth.interface';
import { ToastService } from '~services/toast.service';
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Sửa thành styleUrls
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    user_name: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  public messageErrorServer: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
  ) {}

  ngOnInit(): void {
    // Lắng nghe sự thay đổi giá trị của user_name
    this.formLogin.get('user_name')?.valueChanges.subscribe(() => {
      this.clearServerError();
    });

    // Lắng nghe sự thay đổi giá trị của password
    this.formLogin.get('password')?.valueChanges.subscribe(() => {
      this.clearServerError();
    });
  }

  submitForm() {
    if (!this.formLogin.valid) {
      return;
    }

    this.authService.isLoading = true;

    // Gọi dịch vụ đăng nhập nếu form hợp lệ
    this.authService.login(this.formLogin.value as LoginData).subscribe(
      (response: any) => {
        if (!response.success) {
          this.toastService.show('Đăng nhập thất bại!!!', 'error');
          this.authService.isLoading = false;
          return this.formLogin
            .get('user_name')
            ?.setErrors({ serverError: response.message });
        }

        localStorage.setItem(this.appConfig.ACCESS_TOKEN, response.data.token);

        this.authService.getToken();
        this.authService.isLoading = false;
        this.toastService.show('Đăng nhập thành công!!!', 'success');
        return this.router
          .navigate([this.appConfig.SIGN_IN_REDIRECT_URL])
          .then(() => {
            window.location.reload();
          });
      },
      () => {
        this.authService.isLoading = false;
        this.toastService.show('Đăng nhập thất bại!!!', 'error');
      }
    );
  }

  public getErrorMessage(fieldName: keyof LoginData) {
    const controls = this.formLogin.get(fieldName);

    if (controls?.hasError('required')) {
      return `${fieldName} không được để trống.`;
    }

    if (controls?.hasError('minlength')) {
      return `${fieldName} phải lớn hơn 6 ký tự.`;
    }

    // Kiểm tra lỗi từ server
    if (controls?.hasError('serverError')) {
      return controls.getError('serverError');
    }

    return '';
  }

  public clearServerError() {
    const controls = this.formLogin.controls;

    if (controls.user_name?.hasError('serverError')) {
      controls.user_name.setErrors(null);
    }

    if (controls.password?.hasError('serverError')) {
      controls.user_name.setErrors(null);
    }
  }
}
