import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../core/models/usuario';
import { UsuariosService } from '../../../core/services/usuarios';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-alterar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alterar.html',
  styleUrl: './alterar.scss',
})
export class Alterar implements OnInit{
  form!: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      nome: [''],
      email: [''],
      telefone: [''],
      senha: [''],
    });

    this.usuariosService.buscarPorId(this.id).subscribe((usuario) => {
      this.form.patchValue({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        senha: usuario.senha,
      });
    });
  }

  onSubmit() {
    if(this.form.valid) {
      const usuario: Usuario = {
        id: this.id,
        nome: this.form.value.nome,
        email: this.form.value.email,
        telefone: this.form.value.telefone,
        senha: this.form.value.senha,
        tipo: 'USUARIO'
      };

      this.usuariosService.editar(usuario).subscribe(() => {
        alert('Usuário atualizado com sucesso!');
        this.router.navigate(['/admin/usuarios']);
      });
    }
  }

}
