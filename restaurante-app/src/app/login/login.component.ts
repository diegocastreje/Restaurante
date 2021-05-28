import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleados/empleado';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  empleado: Empleado;

  constructor(private router: Router) {
  this.empleado = new Empleado() }

  ngOnInit(): void {
    /* Cuando se implemente seguridad en front
    if(this.authService.isAuthenticated()){
      swal.fire('Login', `Hola ${this.authService.empleado.username} ya hay una sesión iniciada`, 'info')
      this.router.navigate(['/empleados']);
    }
    */
  }

  login(): void{
    console.log(this.empleado);
    if(this.empleado.usuario == null || this.empleado.password == null){
      swal.fire('Error login', 'Usuario o contraseña vacías!', 'error');
      return;
    }
    /* Cuando se implemente seguridad en front
    this.authService.login(this.empleado).subscribe(response => {
      console.log(response);

      this.authService.guardarEmpleado(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      this.router.navigate(['/clientes']);
      swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito`, 'success')
    }, err => {
      if(err.status == 400){
        swal.fire('Error login', 'Usuario o clave incorrectas!', 'error');
      }
    }
  );
  */
  }

}
