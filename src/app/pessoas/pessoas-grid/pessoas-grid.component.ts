import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas: any[];
  @Input() linhas: any;
  @Input() total: any;
  @Output() feedbackLazyLoad = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() toggleStatusEvent = new EventEmitter();
  @ViewChild('table') table;

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.feedbackLazyLoad.emit({pagina});
  }

  excluir(pessoa: any) {
    this.deleteEvent.emit({codigo: pessoa.id, grid: this.table});
  }

  toggleStatus(pessoa: any) {
    this.toggleStatusEvent.emit({codigo: pessoa.id, status: !pessoa.ativo, grid: this.table});
  }
}
