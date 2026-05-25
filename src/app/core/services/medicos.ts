import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico';


@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  private readonly API = 'http://localhost:3000/medicos';
  constructor(private http: HttpClient) { }
  listar(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.API);
  }
      
  
    incluir(medico: Medico): Observable<Medico> {
      return this.http.post<Medico>(this.API, medico);
    }
  
    buscarPorId(id: number): Observable<Medico> {
      return this.http.get<Medico>(`${this.API}/${id}`);
    }
  
    editar(medico: Medico): Observable<Medico> {
      const url = `${this.API}/${medico.id}`;
      return this.http.put<Medico>(url, medico);
    }
  
    excluir(id: number): Observable<Medico> {
      return this.http.delete<Medico>(`${this.API}/${id}`);
    }
}
