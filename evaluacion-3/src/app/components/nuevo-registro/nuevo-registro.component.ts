import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../service/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-registro',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [PacienteService],
  templateUrl: './nuevo-registro.component.html',
  styleUrls: ['./nuevo-registro.component.css']
})
export class NuevoRegistroComponent {
  pacienteForm: FormGroup;

  constructor(private fb: FormBuilder, private pacienteService: PacienteService, private router: Router) {
    this.pacienteForm = this.fb.group({
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[kK\d]{1}$/)]],
      name: ['', Validators.required],
      age: [0, Validators.required],
      gender: ['', Validators.required],
      disease: ['', Validators.required]
    });
  }

  agregarPaciente() {
    if (this.pacienteForm.valid) {
      this.pacienteService.addPaciente(this.pacienteForm.value).subscribe({
        next: () => {
          alert('Paciente agregado correctamente');
          this.router.navigate(['/registro/listar']);
        },
        error: () => alert('Error al agregar el paciente')
      });
    }
  }
}