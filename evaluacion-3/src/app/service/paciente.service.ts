import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearPaciente, Paciente, Pacientes, Patient } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:3000/api/patients';

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<Pacientes> {
    return this.http.get<Pacientes>(this.apiUrl);
  }

  getPaciente(id: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  buscarPacientes(search: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/search?search=${search}`);
  }

  addPaciente(paciente: CrearPaciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  updatePaciente(id: string, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente);
  }

  deletePaciente(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
