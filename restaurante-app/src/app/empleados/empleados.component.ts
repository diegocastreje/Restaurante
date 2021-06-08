import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import swal from 'sweetalert2';
import { TokenService } from '../security/services/token.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];

  roles: string[];
  isJefe = false;

  constructor(
    private empleadoService: EmpleadoService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe((response) => {
      this.empleados = response;
    });
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( rol => {
      if(rol === 'ROL_JEFE'){
        this.isJefe = true;
      }
    });
  }

  eliminar(empleado: Empleado): void{
    const swalWithBootstrapButtons = swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: '¿Está seguro?',
  text: `¿Seguro que desea eliminar al empleado ${empleado.nombre} ${empleado.apellido}?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Si, eliminar',
  cancelButtonText: 'No, cancelar',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    this.empleadoService.delete(empleado.id).subscribe(
      response =>{
        this.empleados = this.empleados.filter(emp => emp!== empleado)
        swalWithBootstrapButtons.fire(
          'Empleado eliminado!',
          `Empleado ${empleado.nombre} eliminado con éxito.`,
          'success'
    );
  });
  }
  });
}

}
