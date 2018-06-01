import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
    pessoas = [
      {nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', status: 'Ativo'},
      {nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', status: 'Inativo'},
      {nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', status: 'Ativo'},
      {nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', status: 'Ativo'},
      {nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', status: 'Inativo'},
      {nome: 'Paula Maria', cidade: 'Uberlândia', estado: 'MG', status: 'Ativo'}
    ];
}
