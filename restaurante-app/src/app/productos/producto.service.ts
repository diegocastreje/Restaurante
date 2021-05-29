import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from './producto';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint:string = 'http://localhost:8081/restaurante/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  getProducto(id:number): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`);
  }

  create(producto: Producto): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, producto).pipe(
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

  update(producto:Producto):Observable<Producto>{
    return this.http.put<any>(`${this.urlEndPoint}/${producto.id}`,producto).pipe(
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

  delete(id: number): Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }
}
