import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.empleadoService.getItems().subscribe((response) => {
      this.empleados = response;
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
