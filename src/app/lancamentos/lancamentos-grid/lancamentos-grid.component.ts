import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos: any[];
  @Input() linhas: any;
  @Input() total: any;
  @Output() feedbackLazyLoad = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @ViewChild('table') table;

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.feedbackLazyLoad.emit({pagina});
  }

  excluir(lancamento: any) {
    this.deleteEvent.emit({codigo: lancamento.id, grid: this.table});
  }

}
