import { PessoaService } from './pessoas/pessoa.service';
import { LancamentoService } from './lancamentos/lancamento.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, OnInit } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { registerLocaleData } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { AppComponent } from './app.component';


registerLocaleData(localePt, 'pt-BR', localePtExtra);
@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    HttpModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
