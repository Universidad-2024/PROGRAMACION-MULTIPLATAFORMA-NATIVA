import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PacienteService } from '../../service/paciente.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Paciente, Patient } from '../../interfaces';

@Component({
  selector: 'app-detalle-registro',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers: [PacienteService],
  templateUrl: './detalle-registro.component.html',
  styleUrl: './detalle-registro.component.css'
})
export class DetalleRegistroComponent implements OnInit {

  paciente: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pacienteService.getPaciente(id).subscribe(
        (data: Paciente) => {
          console.log(data);
          this.paciente = {
            personal_photo: data.patient.personal_photo ?? 'https://via.placeholder.com/150',
            id: data.patient._id,
            nombre: data.patient.name,
            rut: data.patient.rut,
            edad: data.patient.age,
            sexo: data.patient.gender,
            enfermedad: data.patient.disease,
            fechaIngreso: data.patient.admission_date,
          };
        },
        error => {
          console.error('Error al obtener el detalle del paciente:', error);
        }
      );
    }
  }

  eliminarPaciente(): void {
    if (this.paciente.id) {
      this.pacienteService.deletePaciente(this.paciente.id).subscribe(
        () => {
          alert('Paciente eliminado correctamente');
          this.router.navigate(['/registro/listar']);
        },
        error => {
          console.error('Error al eliminar el paciente:', error);
        }
      );
    }
  }
}
