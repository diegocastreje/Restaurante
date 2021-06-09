import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Mesa } from '../mesa/mesa';
import { Producto } from '../../productos/producto';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  private urlEndPoint: string = 'http://localhost:8081/restaurante/mesas';

  constructor(private http: HttpClient) { }

  getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.urlEndPoint);
  }

  getMesa(id:number): Observable<Mesa>{
    return this.http.get<Mesa>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void>{
    console.log("borra")
    console.log(this.http.delete<void>(`${this.urlEndPoint}/${id}`))
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  filtrarProductos(term: string): Observable<Producto[]>{
      return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${term}`);
  }

  create(mesa: Mesa): Observable<Mesa>{
    return this.http.post<Mesa>(this.urlEndPoint, mesa);
  }

  update(mesa:Mesa):Observable<Mesa>{
    return this.http.put<any>(`${this.urlEndPoint}/${mesa.id}`,mesa).pipe(
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
}
