import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas/pessoas-cadastro/pessoas-cadastro.component';
import { LancamentosCadastroComponent } from './lancamentos/lancamentos-cadastro/lancamentos-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { registerLocaleData } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { AppComponent } from './app.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';


registerLocaleData(localePt, 'pt-BR', localePtExtra);

const rotas: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/cadastro', component: LancamentosCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentosCadastroComponent },
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/cadastro', component: PessoasCadastroComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' },
];

@NgModule({
  declarations: [
    AppComponent,
    PaginaNaoEncontradaComponent
  ],

  imports: [
    BrowserModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    HttpModule,
    RouterModule.forRoot(rotas)
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
