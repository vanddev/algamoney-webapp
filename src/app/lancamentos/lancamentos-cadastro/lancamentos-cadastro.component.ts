import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { LancamentoService } from '../lancamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'},
  ];

  categorias = [];

  pessoas = [];

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private service: LancamentoService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.service.buscarPorCodigo(codigo)
        .then(response => this.lancamento = response)
        .catch(erro => this.errorHandler.handle(erro));
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }


  get editando() {
    return Boolean(this.lancamento.id);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.service.salvar(this.lancamento)
      .then(response => {
        this.toasty.success('Lançamento criado com sucesso!');
        this.router.navigate(['/lancamentos']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.service.atualizar(this.lancamento)
      .then(response => {
        this.toasty.success('Lançamento editado com sucesso!');
        this.lancamento = response;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({label: c.nome, value: c.id}));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.pesquisarTodos()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({label: p.nome, value: p.id}));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
