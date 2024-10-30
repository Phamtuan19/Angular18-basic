import { InjectionToken } from '@angular/core';
import { IAppConfig } from './app.config.interface';
import { appRouters } from './appRouters';

export const APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  /**
   * The key used to store the access token in local storage.
   */
  ACCESS_TOKEN: 'ACCESS_TOKEN',

  /**
   * The key used to store the refresh token in local storage.
   */
  REFRESH_TOKEN: 'REFRESH_TOKEN',

  /**
   * The URL to redirect to after a successful sign-in.
   */
  SIGN_IN_REDIRECT_URL: '/',

  /**
   * The URL to redirect to after a successful sign-out.
   */
  SIGN_OUT_REDIRECT_URL: appRouters.auth + '/' + appRouters.login,

  /**
   * The URL to redirect to when a user is not authorized
   */
  UNAUTHORIZED_REDIRECT_URL: appRouters.auth + '/' + appRouters.login,
} as const;
