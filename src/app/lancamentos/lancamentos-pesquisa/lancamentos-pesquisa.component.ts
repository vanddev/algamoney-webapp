import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})

export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [];
  filtro = new LancamentoFiltro();
  totalRegistros = 0;

  constructor(
    private service: LancamentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.service.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      })
      .catch(error => this.errorHandler.handle(error));

  }

  receiverLazyLoadFeedback(feedback: any) {
    this.pesquisar(feedback.pagina);
  }

  receiverDeleteEvent(event: any) {
    this.confirmation.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => {
        this.excluir(event);
      }
    });

  }

  excluir(event: any) {
    this.service.excluir(event.codigo)
      .then(() => {
        if (event.grid.first === 0) {
          this.pesquisar();
        } else {
          event.grid.first = 0;
        }
        this.toasty.success('Lançamento excluído com sucesso!');
      })
      .catch(error => this.errorHandler.handle(error));
  }
}
