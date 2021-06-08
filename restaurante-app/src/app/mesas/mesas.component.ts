import { Component, OnInit } from '@angular/core';
import { TokenService } from '../security/services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MesaService } from './mesa/mesa.service';
import { Mesa } from './mesa/mesa';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {

  isLogged = false;
  mesa: Mesa = new Mesa();
  mesas: Mesa[] = [];

  constructor(
    private tokenService: TokenService,
    private mesaService: MesaService
  ) { }

  ngOnInit(): void {

    this.mesaService.getMesas().subscribe((response) => {
      this.mesas = response;
    });
  }

  public create():void{
    this.mesaService.create(this.mesa).subscribe(mesa =>

      swal
        .fire({
          title: 'Mesa creada',
          text: `Mesa creada con éxito`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK!',
        })
        .then((result) => {
          if (result.isConfirmed) {
              window.location.reload();
            }
          }

  ));
}

}
