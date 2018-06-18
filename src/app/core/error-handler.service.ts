import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { NotAuthenticatedError } from '../seguranca/money-http';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirout!';
      this.router.navigate(['/login']);

    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {
      const apiError = errorResponse.json();
      const apiErrorMessage = apiError.hasOwnProperty('sub_erros') ? apiError.sub_erros[0].message : apiError.message;
      msg = `Erro ao processar serviço: ${apiErrorMessage}`;
      console.log('Ocorreu um erro', errorResponse);

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }

    } else {
      msg = 'Erro ao processar serviço. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.toasty.error(msg);
  }
}
