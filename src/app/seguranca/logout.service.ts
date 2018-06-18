import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class LogoutService {

  tokensRevokeUrl = 'http://localhost:8090/tokens/revoke';

  constructor(
    private http: AuthHttp,
    private authService: AuthService
  ) { }


  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.authService.limparAccessToken();
      });
  }

}
