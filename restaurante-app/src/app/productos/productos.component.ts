import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import swal from 'sweetalert2';
import { TokenService } from '../security/services/token.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];

  roles: string[];
  isJefe = false;

  constructor(
    private productoService: ProductoService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((response) => {
      this.productos = response;
    });
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( rol => {
      if(rol === 'ROL_JEFE'){
        this.isJefe = true;
      }
    });
  }

  eliminar(producto: Producto): void{
    const swalWithBootstrapButtons = swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: '¿Está seguro?',
  text: `¿Seguro que desea eliminar el producto ${producto.nombre}?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Si, eliminar',
  cancelButtonText: 'No, cancelar',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    this.productoService.delete(producto.id).subscribe(
      response =>{
        this.productos = this.productos.filter(prod => prod!== producto)
        swalWithBootstrapButtons.fire(
          'Producto eliminado!',
          `Producto ${producto.nombre} eliminado con éxito.`,
          'success'
    );
  });
  }
  });
}

}
