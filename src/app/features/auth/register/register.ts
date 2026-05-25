import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../core/models/usuario';
import { UsuariosService } from '../../../core/services/usuarios';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    tipo: 'USUARIO',
    cpf: ''
  };

  constructor(
    private service: UsuariosService,
    private router: Router
  ) { }

  submeter() {
    this.service.incluir(this.usuario).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
