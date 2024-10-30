import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_CONFIG, AppConfig } from './app/configs/app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './app/shared/interceptors/api.interceptor';
import { AuthGuard } from './app/shared/guards/auth.guard';
import { appRouters } from './app/configs/appRouters';
import { authRouter } from './app/module/auth/auth.router';
import { HomeComponent } from './app/module/home/home.component';
import { LayoutComponent } from '~shared/components';
import { PageNotFoundComponent } from '~module/error-page';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([
      ...authRouter,
      {
        path: appRouters.home,
        canActivate: [AuthGuard],
        component: LayoutComponent,
        children: [
          {
            path: appRouters.home,
            component: HomeComponent,
          },
        ],
      },
      {
        path: appRouters.notFound,
        component: PageNotFoundComponent,
      },
      {
        path: '**',
        redirectTo: appRouters.notFound,
      },
    ]),
    {
      provide: APP_CONFIG,
      useValue: AppConfig,
    },
    provideHttpClient(withInterceptors([apiInterceptor])),
  ],
}).catch((err) => console.error(err));
