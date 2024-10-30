import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { APP_CONFIG } from 'src/app/configs/app.config';
import { IAppConfig } from 'src/app/configs/app.config.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
  ) {}

  canActivate() {
    if (this.authService.token) {
      console.log('AuthGuard 1');
      return true;
    } else {
      console.log('AuthGuard 2');
      this.router.navigate([this.appConfig.UNAUTHORIZED_REDIRECT_URL]);
      return false;
    }
  }
}
