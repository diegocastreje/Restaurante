import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { TokenService } from '../security/services/token.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

    isLogged = false;

  constructor(private router: Router,
  private tokenService: TokenService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  onLogOut(): void{
    this.tokenService.logOut();

    swal
      .fire({
        title: 'Inicio de sesión',
        text: `Ha iniciado sesión con éxito`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login'])
          .then(() => {
            window.location.reload();
          });
        }
      });

  }

}
