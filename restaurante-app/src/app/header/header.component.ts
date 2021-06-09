import{Component, OnInit} from '@angular/core';
import { TokenService } from '../security/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: '/header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  title: string = 'Mi Restaurante';
  isLogged = false;
  usuario = '';

  constructor(private tokenService: TokenService){}

  ngOnInit(): void{
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.usuario = this.tokenService.getUsuario();
    }else{
      this.isLogged = false;
      this.usuario = '';
    }
  }
}
