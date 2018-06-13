import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/api';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

    pessoas = [];
    filtro = new PessoaFiltro();
    totalRegistros = 0;

    constructor(
      private service: PessoaService,
      private confimation: ConfirmationService,
      private errorHandler: ErrorHandlerService,
      private toasty: ToastyService,
      private title: Title
    ) {}

    ngOnInit() {
      this.title.setTitle('Pessoas | Algamoney');
    }

    pesquisar(pagina = 0) {
      this.filtro.pagina = pagina;
      this.service.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;
      });
    }

    receiverLazyLoadFeedback(feedback: any) {
      this.pesquisar(feedback.pagina);
    }

    receiverDeleteEvent(event: any) {
      this.confimation.confirm({
        message: 'Deseja realmente excluir?',
        accept: () => {
          this.excluir(event);
        }
      });
    }

    receiverToggleStatusEvent(event: any) {
      this.service.atualizarStatus(event.codigo, event.status)
        .then(() => {
          this.toasty.success(`Pessoa ${event.status ? 'ativada' : 'desativada'} com sucesso!`);
          this.atualizarGrid(event.grid);
        });
    }

    excluir(event: any) {
      this.service.excluir(event.codigo)
        .then(() => {
          this.atualizarGrid(event.grid);
          this.toasty.success('Pessoa excluída com sucesso!');
        })
        .catch(error => this.errorHandler.handle(error));
    }

    atualizarGrid(grid: any) {
      if (grid.first === 0) {
        this.pesquisar();
      } else {
        grid.first = 0;
      }
    }
}
