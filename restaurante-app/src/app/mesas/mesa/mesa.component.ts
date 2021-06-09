import { Component, OnInit } from '@angular/core';
import { MesaService } from './mesa.service';
import { Mesa } from './mesa';
import { MesaProductos } from '../mesa/mesa-productos';
import { ProductoService } from '../../productos/producto.service';
import { Producto } from '../../productos/producto';
import { ActivatedRoute, Router } from '@angular/router';
import {map, flatMap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { TokenService } from '../../security/services/token.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  productos: Producto[] = [];
  mesa: Mesa = new Mesa();
  usuario: string;

  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private mesaService: MesaService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.usuario= this.tokenService.getUsuario();
    this.productoService.getProductos().subscribe((response) => {
      this.productos = response;
    });
    this.activatedRoute.paramMap.subscribe(params =>{
      let id = +params.get('id');
      if(id){
        this.mesaService.getMesa(id).subscribe((mesa) => {
          this.mesa = mesa;
          this.mesa.calcularTotal = mesa.calcularTotal;
        });
      }
    });
    console.log(this.mesa);
    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string'? value: value.nombre),
        flatMap(value => value ? this._filter(value): [])
      );
  }

  private _filter(value: string): Observable<Producto[]>{
    const filterValue = value.toLowerCase();

    return this.mesaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto? producto.nombre: undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void{
    let producto = event.option.value as Producto;

    if(this.existeProducto(producto.id)){
      this.incrementaCantidad(producto.id);
    }else{
      if(this.existeStock(producto.id)){
        let nuevoProducto = new MesaProductos();
        nuevoProducto.producto = producto;
        console.log(nuevoProducto);
        this.mesa.productos.push(nuevoProducto);
        --nuevoProducto.producto.stock;
        this.productoService.update(nuevoProducto.producto);
        console.log(this.mesa);
      }else{
        swal.fire('Producto sin stock', 'No queda más stock de este producto', 'warning')
      }
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  actualizarCantidad(id: number, event: any): void{
    let cantidad: number = event.target.value as number;

    if(cantidad == 0){
      return this.eliminarProductoMesa(id);
    }

    this.mesa.productos = this.mesa.productos.map((item: MesaProductos) =>{
      if(id === item.producto.id){
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeProducto(id: number): boolean{
    let existe = false;

    this.mesa.productos.forEach((item: MesaProductos) => {
      if( id === item.producto.id){
        existe = true;
      }
    });

    return existe;
  }

  existeStock(id: number): boolean{
    let existe = false;
    this.productos.forEach((producto: Producto) => {
      if( producto.stock > 0){
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number):void{
    this.mesa.productos = this.mesa.productos.map((item: MesaProductos) =>{
      if(id === item.producto.id){
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarProductoMesa(id: number): void{
    this.mesa.productos = this.mesa.productos.filter((item: MesaProductos) => id !== item.producto.id);
  }

  guardarMesa(mesa: Mesa):void{
    this.mesaService.update(mesa).subscribe(mesa => {
      swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Mesa guardada',
  showConfirmButton: false,
  timer: 700
}).then(() => {
  window.location.reload();
});
});

}

  pagarMesa(mesa: Mesa): void{
    this.mesaService.delete(mesa.id).subscribe(
      response =>{
        swal.fire(
          'Mesa pagada!',
          `Mesa ${mesa.id} pagada con éxito.`,
          'success'
    );
    this.router.navigate(['/mesas']);
  });
  }

}
