import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { TokenService } from '../security/services/token.service';
import { AuthService } from '../security/services/auth.service';
import { LoginEmpleado } from '../security/models/login-empleado';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginEmpleado: LoginEmpleado;

  usuario: string;
  password: string;
  roles: string[];

  constructor(private tokenService: TokenService,
  private authService: AuthService,
  private router: Router
) {}

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void{
    this.loginEmpleado = new LoginEmpleado(this.usuario, this.password);
    this.authService.login(this.loginEmpleado).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUsuario(data.usuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;

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
              this.router.navigate(['/mesas'])
              .then(() => {
                window.location.reload();
              });
            }
          });

      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
      }
    );
  }

  togglePassword() {
    var element: HTMLInputElement;
    var button;

    element = document.getElementById('password') as HTMLInputElement;
    button = document.getElementById('eye-1');

    if (element.type === 'password') {
      element.type = 'text';
      button?.setAttribute('class', 'bi-eye');
    } else {
      element.type = 'password';
      button?.setAttribute('class', 'bi-eye-slash');
    }
  }

}
