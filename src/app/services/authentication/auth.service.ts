import { ToastService } from './../toast.service';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { APP_CONFIG } from 'src/app/configs/app.config';
import { IAppConfig } from 'src/app/configs/app.config.interface';
import { LoginData, UserData } from './auth.interface';
import { ApiRouters } from 'src/app/configs/apiRouters';
import { Router } from '@angular/router';

/**
 *
 * @Injectable là một decorator dùng để đánh dấu một lớp (class) như là một service,
 * cho phép Angular biết rằng lớp này có thể được tiêm vào các component hoặc service khác.
 *
 * @providedIn 'root' cho phép Angular biết rằng service này nên được cung cấp ở mức ứng dụng.
 * Điều này có nghĩa là chỉ có một instance duy nhất của service này sẽ được tạo ra và chia sẻ trên toàn bộ ứng dụng.
 *
 * khi sử dụng providedIn: 'root' thì không cần phải thêm vào providers của bất kỳ module nào.
 *
 * @Lợi_ích
 * @providedIn = 'root'
 *
 * @Singleton_Instance Chỉ có một instance duy nhất của service được tạo ra,
 * giúp tiết kiệm bộ nhớ và quản lý tốt hơn trạng thái.
 * @Dễ_Dàng_Quản_Lý Bạn không cần phải lo lắng về việc thêm service vào module nào đó.
 * Nó sẽ tự động sẵn sàng để sử dụng.
 * @Tăng_Cường_Hiệu_Suất Giảm thiểu thời gian và nỗ lực cần thiết để cấu hình và quản lý các service.
 *
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthentication: boolean = false;
  public isLoading: boolean = false;
  public token: string | null = null;
  public userData: UserData | null = null;

  constructor(
    public apiService: ApiService,
    private router: Router,
    private toastService: ToastService,
    @Inject(APP_CONFIG) public appConfig: IAppConfig
  ) {
    this.getToken();
  }

  public isLoggedIn() {
    return false;
  }

  public getToken() {
    const tokenStoget =
      localStorage.getItem(this.appConfig.ACCESS_TOKEN) ?? null;

    return (this.token = tokenStoget);
  }

  public checkAuthentication() {
    this.getToken();

    if (this.token) {
      this.isLoading = true;
      this.getMe().subscribe(
        (response) => {
          this.userData = response.data.user;
          this.isAuthentication = true;
          this.isLoading = false;
        },
        () => {
          this.toastService.show(
            'Đã có lỗi xảy ra. Vui lòng đăng nhập lại!!!',
            'error'
          );
          this.logout();
        }
      );
    } else {
      this.isLoading = false;
    }
  }

  public getMe() {
    return this.apiService.apiGet(ApiRouters.authVerify);
  }

  public login(data: LoginData) {
    return this.apiService.postRequest<LoginData>(ApiRouters.login, data);
  }

  public logout() {
    localStorage.removeItem(this.appConfig.ACCESS_TOKEN);
    this.getToken();
    this.isLoading = false;
    this.isAuthentication = false;
    this.userData = null;
    this.router.navigate([this.appConfig.SIGN_OUT_REDIRECT_URL]);
  }
}
