import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    swal.fire('Cierre de sesión', `Has cerrado sesión con éxito`, 'success');
    this.router.navigate(['/login']);
  }
  
  /* Cuando se implemente la seguridad
    logout(): void{
      swal.fire('Logout', `Hola ${this.authService.usuario.username}, has cerrado sesión con éxito`, 'success');
      this.router.navigate(['/login']);
      this.authService.logout();
    }
    */
}
