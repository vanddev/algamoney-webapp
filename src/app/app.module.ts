import { AppRoutingModule } from './app-routing-module';
import { BrowserModule } from '@angular/platform-browser';
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
    AppRoutingModule
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
