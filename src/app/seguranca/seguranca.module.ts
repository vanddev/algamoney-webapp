import { LogoutService } from './logout.service';
import { AuthGuard } from './auth.guard';
import { MoneyHttp } from './money-http';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

export function authHttpServiceFactory(auth: AuthService , http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    tokenName: 'access_token',
    globalHeaders: [{'Content-Type': 'application/json'}],
  });
  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [LoginFormComponent],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AuthService, Http, RequestOptions]
    },
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
