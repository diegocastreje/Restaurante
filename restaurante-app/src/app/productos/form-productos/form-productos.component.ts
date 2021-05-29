import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css']
})
export class FormProductosComponent implements OnInit {

  public titulo: string = "Añadir Producto";
  public producto:Producto =new Producto();

  constructor(public productoService : ProductoService,
  public router:Router,
  public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto():void{
    this.activatedRoute.params.subscribe(params =>{
      let producto_id = params['id']
      if(producto_id){
        this.productoService.getProducto(producto_id).subscribe((producto) => this.producto = producto)
      }
    })
  }

  public create():void{
    this.productoService.create(this.producto).subscribe(
      reponse => this.router.navigate(['/productos'])
    );
    Swal.fire('Producto creado',`Producto ${this.producto.nombre} creado con éxito`, 'success')
  }

  update():void{
    this.productoService.update(this.producto).subscribe(user => {
      this.router.navigate(['/productos'])
        Swal.fire('Producto actualizado',`Producto ${this.producto.nombre} actualizado con éxito`, 'success')
    });
  }

}
