import { Component } from '@angular/core';
import { PacienteService } from '../../service/paciente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers: [PacienteService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ultimosPacientes: any = [];
  totalPacientes = 0;
  pacientesRevisados = 0;
  hombres = 0;
  mujeres = 0;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.obtenerUltimosPacientes();
    this.obtenerEstadisticas();
  }

  obtenerUltimosPacientes(): void {
    this.pacienteService.getPacientes().subscribe((pacientes) => {
      const items = pacientes.patients.sort((a, b) => {
        return new Date(b.admission_date).getTime() - new Date(a.admission_date).getTime();
      });

      this.ultimosPacientes = items.map((item) => {
        return {
          id: item._id,
          nombre: item.name,
          edad: item.age,
          sexo: item.gender,
          fechaIngreso: item.admission_date,
        }
      }).slice(0, 5);

    });
  }

  obtenerEstadisticas(): void {
    this.pacienteService.getPacientes().subscribe((pacientes) => {
      this.totalPacientes = pacientes.patients.length;
      this.pacientesRevisados = pacientes.patients.filter((paciente) => paciente.reviewed).length;
      this.hombres = pacientes.patients.filter((paciente) =>
        paciente.gender === 'Masculino' ).length;
      this.mujeres = pacientes.patients.length - this.hombres;

    });
  }

}
