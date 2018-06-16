import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaService {

  categoriasUrl = 'http://localhost:8090/categorias';

  constructor(private http: AuthHttp) { }

  listarTodas(): Promise<any> {

    return this.http.get(this.categoriasUrl)
    .toPromise()
    .then(response => response.json());
  }
}
