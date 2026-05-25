import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../core/services/usuarios';
import { Usuario } from '../../../core/models/usuario';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.scss'],
})
export class Usuarios implements OnInit {
  listaUsuarios: Usuario[] = [];

  constructor(private service: UsuariosService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.service.listar().subscribe((usuarios) => {
      this.listaUsuarios = usuarios;
    });
  }

  excluir(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    this.service.excluir(id).subscribe(() => {
      this.carregarUsuarios();
    });
  }
}

