import { ToastService } from './services/toast.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/authentication/auth.service';
import { SpinnerComponent } from '~shared/components';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {}
  ngOnInit() {
    this.authService.checkAuthentication();
  }
}
