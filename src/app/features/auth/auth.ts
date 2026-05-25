import { Injectable } from '@angular/core';
import { UsuariosService } from '../../core/services/usuarios';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private usuariosService: UsuariosService) {}

  private get storageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  login(email: string, senha: string): Observable<boolean> {
    const fixedAdmin = email === 'admin@gmail.com' && senha === 'admin';
    const fixedMedico = email === 'medico@gmail.com' && senha === 'medico';
    const fixedUsuario = email === 'usuario@gmail.com' && senha === 'usuario';

    if (fixedAdmin || fixedMedico || fixedUsuario) {
      if (this.storageAvailable) {
        if (fixedAdmin) {
          localStorage.setItem('token', 'admin-token');
          localStorage.setItem('tipo', 'ADMIN');
        } else if (fixedMedico) {
          localStorage.setItem('token', 'medico-token');
          localStorage.setItem('tipo', 'MEDICO');
        } else {
          localStorage.setItem('token', 'usuario-token');
          localStorage.setItem('tipo', 'USUARIO');
        }
      }
      return of(true);
    }

    return this.usuariosService.listar().pipe(
      map((usuarios) => {
        const usuario = usuarios.find(
          (item) => item.email === email && item.senha === senha
        );

        if (!usuario) {
          return false;
        }

        const tipo = this.normalizeTipo(usuario.tipo);

        if (this.storageAvailable) {
          localStorage.setItem('token', `${tipo.toLowerCase()}-token`);
          localStorage.setItem('tipo', tipo);
        }

        return true;
      })
    );
  }

  isAuthenticated(): boolean {
    return this.storageAvailable && !!localStorage.getItem('token');
  }

  getUserType(): string {
    return this.storageAvailable ? localStorage.getItem('tipo') || '' : '';
  }

  private normalizeTipo(tipo: string | undefined): 'ADMIN' | 'MEDICO' | 'USUARIO' {
    if (!tipo) {
      return 'USUARIO';
    }

    const normalized = tipo.toUpperCase();
    if (normalized.includes('ADMIN')) {
      return 'ADMIN';
    }
    if (normalized.includes('MEDIC')) {
      return 'MEDICO';
    }
    return 'USUARIO';
  }
}
