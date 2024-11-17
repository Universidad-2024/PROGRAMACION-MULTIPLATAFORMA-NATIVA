import { Component } from '@angular/core';
import { Paciente, Pacientes, Patient } from '../../interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../service/paciente.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-busqueda-registro',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule],
  providers: [PacienteService],
  templateUrl: './busqueda-registro.component.html',
  styleUrl: './busqueda-registro.component.css'
})
export class BusquedaRegistroComponent {
  buscarForm: FormGroup;
  pacientes: any = [];

  constructor(private fb: FormBuilder, private pacienteService: PacienteService, private route: ActivatedRoute) {
    this.buscarForm = this.fb.group({
      search: ['']
    });
  }

  buscarPacientes(): void {
    const { search } = this.buscarForm.value;
    this.pacienteService.buscarPacientes(search).subscribe(
      (data: Patient[]) => {
        this.pacientes = data.map((paciente: Patient) => {
          return {
            id: paciente._id,
            fotoPersonal: paciente.personal_photo ?? 'https://via.placeholder.com/150',
            nombre: paciente.name,
            edad: paciente.age,
            sexo: paciente.gender,
            rut: paciente.rut,
            fechaIngreso: paciente.admission_date,
            enfermedad: paciente.disease,
          }

        });
      },
      error => {
        console.error('Error al buscar pacientes:', error);
      }
    );
  }

}
