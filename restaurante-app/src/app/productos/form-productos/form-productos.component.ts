import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css']
})
export class FormProductosComponent implements OnInit {

  public titulo: string = "Añadir Producto";

  constructor() { }

  ngOnInit(): void {
  }

}
