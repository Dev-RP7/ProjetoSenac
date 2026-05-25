import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../core/models/medico';
import { MedicosService } from '../../../core/services/medicos';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medicos.html',
  styleUrl: './medicos.scss',
})
export class Medicos implements OnInit {
  listaMedicos: Medico[] = [];

  constructor(private service: MedicosService, private router: Router) {}

  ngOnInit(): void {
    this.carregarMedicos();
  }

  carregarMedicos(): void {
    this.service.listar().subscribe((medicos) => {
      this.listaMedicos = medicos;
    });
  }

  excluir(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este médico?')) {
      return;
    }

    this.service.excluir(id).subscribe(() => {
      this.carregarMedicos();
    });
  }

}
