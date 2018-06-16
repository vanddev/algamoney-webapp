import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos/lancamentos-cadastro/lancamentos-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas/pessoas-cadastro/pessoas-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const rotas: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/cadastro', component: LancamentosCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentosCadastroComponent },
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/cadastro', component: PessoasCadastroComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: '**', redirectTo: 'pagina-nao-encontrada' },
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(rotas)
    ],
    exports: [RouterModule]
  })

export class AppRoutingModule {
}
