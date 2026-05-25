import { Component } from '@angular/core';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [],
  templateUrl: './consultas.html',
  styleUrl: './consultas.scss',
})
export class Consultas {

  novaConsulta() {
    alert('Nova consulta');
  }
}
