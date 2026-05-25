import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MedicosService } from '../../../core/services/medicos';
import { Medico } from '../../../core/models/medico';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alterar-medico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alterar-medico.html',
  styleUrl: './alterar-medico.scss',
})
export class AlterarMedico implements OnInit{
  form!: FormGroup;
  idMedico!: number;

  constructor(
    private service: MedicosService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.idMedico = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      nome: [''],
      email: [''],
      senha: ['']
    });

    this.service.buscarPorId(this.idMedico).subscribe((medico) => {
      if (medico) {
        this.form.patchValue({
          nome: medico.nome,
          email: medico.email,
          senha: medico.senha
        });
      }
    });
  } 
  
  onSubmit(): void {
    if (this.form.valid) {
      const medicoAtualizado: Medico = {
        id: this.idMedico,
        ...this.form.value
      };
      this.service.editar(medicoAtualizado).subscribe(() => {
        this.router.navigate(['/admin/medicos']);
      });
    }
  }    
}
