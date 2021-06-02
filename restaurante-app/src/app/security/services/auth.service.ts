import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoEmpleado } from '../models/nuevo-empleado';
import { LoginEmpleado } from '../models/login-empleado';
import { JwtDTO } from '../models/jwt-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8081/auth/';

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoEmpleado: NuevoEmpleado): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoEmpleado);
  }
  public login(loginEmpleado: LoginEmpleado): Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginEmpleado);
  }
}
