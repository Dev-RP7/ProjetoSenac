import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {

  email: string = '';
  senha: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  entrar() {
    this.authService.login(this.email, this.senha).subscribe((sucesso) => {
      if (sucesso) {
        const tipo = this.authService.getUserType();

        if (tipo === 'ADMIN') {
          this.router.navigate(['/admin/home']);
        } else if (tipo === 'MEDICO') {
          this.router.navigate(['/medico/home']);
        } else {
          this.router.navigate(['/usuario/home']);
        }
      } else {
        alert('Email ou senha inválidos!');
      }
    });
  }
}
