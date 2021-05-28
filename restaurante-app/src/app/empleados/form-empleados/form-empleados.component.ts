import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-empleados',
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})
export class FormEmpleadosComponent implements OnInit {

  public titulo: string = "Añadir Empleado";

  constructor() { }

  ngOnInit(): void {
  }

}
