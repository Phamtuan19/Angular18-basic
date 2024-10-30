import { Route } from '@angular/router';
import { appRouters } from 'src/app/configs/appRouters';
import { LoginComponent } from './login/login.component';
import { NoAuthenticationGuard } from '~shared/guards/noAuthentication.guard';

export const authRouter: Array<Route> = [
  {
    path: appRouters.auth,
    canActivate: [NoAuthenticationGuard],
    children: [
      {
        path: appRouters.login,
        component: LoginComponent,
      },
    ],
  },
];
