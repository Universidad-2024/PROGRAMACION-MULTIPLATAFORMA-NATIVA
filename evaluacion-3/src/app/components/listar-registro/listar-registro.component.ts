import { Component } from '@angular/core';
import { Paciente, Pacientes } from '../../interfaces';
import { PacienteService } from '../../service/paciente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-registro',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers: [PacienteService],
  templateUrl: './listar-registro.component.html',
  styleUrl: './listar-registro.component.css'
})
export class ListarRegistroComponent {
  pacientes: any = [];

  constructor(    
    private route: ActivatedRoute,
    private pacienteService: PacienteService
  ) {}
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe(
      (data: Pacientes) => {
        this.pacientes = data.patients.map((paciente) => {
          return {
            id: paciente._id,
            personal_photo: paciente?.personal_photo ?? 'https://via.placeholder.com/150',
            nombre: paciente.name,
          };
        });
      },
      (error) => {
        console.error('Error al cargar pacientes:', error);
      }
    );
  }

}
