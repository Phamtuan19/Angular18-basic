import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { APP_CONFIG } from 'src/app/configs/app.config';
import { IAppConfig } from 'src/app/configs/app.config.interface';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (!this.authService.token) {
      return true;
    } else {
      this.router.navigate([this.appConfig.SIGN_IN_REDIRECT_URL]);
      return false;
    }
  }
}
