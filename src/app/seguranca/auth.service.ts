import { ToastyService } from 'ng2-toasty';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  oauthTokenUrl = 'http://localhost:8090/oauth/token';
  jwtPayload: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper,
    private toasty: ToastyService
  ) {
    this.carregarToken();
  }

  login(email: string, senha: string): Promise<void> {

    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${email}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl , body,  { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);
      })
      .catch(response => {
        if (response.status === 400) {

          if (response.json().error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const body = 'grant_type=refresh_token';

    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);
        console.log('Novo access token criado!');
      })
      .catch(response => {
        console.error(response);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('access_token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('access_token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
