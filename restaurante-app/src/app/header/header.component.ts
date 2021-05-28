import{Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: '/header.component.html'
})
export class HeaderComponent{
  title: string = 'Mi Restaurante';

  constructor(private router: Router){}

/* Cuando se implemente la seguridad
  logout(): void{
    swal.fire('Logout', `Hola ${this.authService.usuario.username}, has cerrado sesión con éxito`, 'success');
    this.router.navigate(['/login']);
    this.authService.logout();
  }
  */
}
