import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

    pessoas = [];
    filtro = new PessoaFiltro();
    totalRegistros = 0;

    constructor(private service: PessoaService) {}

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
}
