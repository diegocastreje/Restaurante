import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empleado } from './empleado';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint:string = 'http://localhost:8081/restaurante/empleados';

  constructor(private http: HttpClient) { }

  getItems(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.urlEndPoint);
  }

  getEmpleado(id:number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.urlEndPoint}/${id}`);
  }

  create(empleado: Empleado): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, empleado).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }
        if ( e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  update(empleado:Empleado):Observable<Empleado>{
    return this.http.put<any>(`${this.urlEndPoint}/${empleado.id}`,empleado).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }
        if ( e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Empleado>{
    return this.http.delete<Empleado>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }
}
