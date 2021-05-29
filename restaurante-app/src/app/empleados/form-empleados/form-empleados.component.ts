import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-empleados',
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})
export class FormEmpleadosComponent implements OnInit {

  public titulo: string = "Añadir Empleado";
  public empleado:Empleado =new Empleado();

  constructor(public empleadoService : EmpleadoService,
  public router:Router,
  public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  cargarEmpleado():void{
    this.activatedRoute.params.subscribe(params =>{
      let empleado_id = params['id']
      if(empleado_id){
        this.empleadoService.getEmpleado(empleado_id).subscribe((empleado) => this.empleado = empleado)
      }
    })
  }

  public create():void{
    this.empleadoService.create(this.empleado).subscribe(
      reponse => this.router.navigate(['/empleados'])

    )
    Swal.fire('Empleado creado',`Empleado ${this.empleado.usuario} creado con éxito`, 'success')
  }

  update():void{
    this.empleadoService.update(this.empleado).subscribe(user => {
      this.router.navigate(['/empleados'])
        Swal.fire('Empleado actualizado',`Empleado ${this.empleado.usuario} actualizado con éxito`, 'success')
    });
  }

}
