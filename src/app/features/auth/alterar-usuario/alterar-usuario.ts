import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../core/services/usuarios';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../core/models/usuario';

@Component({
  selector: 'app-alterar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alterar-usuario.html',
  styleUrl: './alterar-usuario.scss',
})
export class AlterarUsuario implements OnInit {
  form!: FormGroup;
  idUsuario!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: UsuariosService
  ) { }

  ngOnInit(): void {
      this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));
      this.form = this.fb.group({
        nome: [''],
        email: [''],
        senha: [''],
        telefone: ['']
      });
  
      this.service.buscarPorId(this.idUsuario).subscribe((usuario) => {
        if (usuario) {
          this.form.patchValue({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            telefone: usuario.telefone
          });
        }
      });
    } 
    
    onSubmit(): void {
      if (this.form.valid) {
        const usuarioAtualizado: Usuario = {
          id: this.idUsuario,
          ...this.form.value
        };
        this.service.editar(usuarioAtualizado).subscribe(() => {
          this.router.navigate(['/admin/usuarios']);
        });
      }
    }   
}
