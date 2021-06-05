import { Component } from '@angular/core';
import { TokenService } from '../security/services/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: '/footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent{

  isLogged = false;
  fecha: string;
  date: Date = new Date();

constructor(private tokenService: TokenService){}

ngOnInit(): void {

  if(this.tokenService.getToken()){
    this.isLogged = true;
  }else{
    this.isLogged = false;
  }

  let nombreDia = this.date.getDay();
  let dia = this.date.getDate();
  let mes = this.date.getMonth() + 1;
  let anho = this.date.getFullYear();

  this.fecha = this.getDia(nombreDia) + " - " + dia + "/" + mes + "/" + anho;
}

private getDia(dia: number): string{
  let nombreDia: string;
  if (dia == 1)
    nombreDia = "Lunes";
  else if (dia == 2)
    nombreDia = "Martes";
  else if (dia == 3)
    nombreDia = "Miércoles";
  else if (dia == 4)
    nombreDia = "Jueves";
  else if (dia == 5)
    nombreDia = "Viernes";
  else if (dia == 6)
    nombreDia = "Sábado";
  else if (dia == 7)
    nombreDia = "Domingo";
  return nombreDia;
}

}
