import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Paciente, Patient } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../service/paciente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-registro',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [PacienteService],
  templateUrl: './actualizar-registro.component.html',
  styleUrl: './actualizar-registro.component.css'
})
export class ActualizarRegistroComponent {
  pacienteForm: FormGroup;
  paciente: Patient | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private pacienteService: PacienteService
  ) {
    this.pacienteForm = this.fb.group({
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[kK\d]{1}$/)]],
      name: ['', Validators.required],
      age: [0, Validators.required],
      gender: ['', Validators.required],
      disease: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pacienteService.getPaciente(id).subscribe(
        (data: Paciente) => {
          this.paciente = data.patient;
          this.pacienteForm.patchValue(data.patient);
        },
        error => {
          console.error('Error al obtener el detalle del paciente:', error);
        }
      );
    }
  }

  actualizarPaciente(): void {
    if (this.pacienteForm.valid && this.paciente) {
      this.pacienteService.updatePaciente(this.paciente._id, this.pacienteForm.value).subscribe(
        () => {
          alert('Paciente actualizado correctamente');
          this.router.navigate(['/registro/listar']);
        },
        error => {
          console.error('Error al actualizar el paciente:', error);
        }
      );
    }
  }
}
