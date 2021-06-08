import { Component, OnInit } from '@angular/core';
import { MesaService } from './mesa.service';
import { Mesa } from './mesa';
import { MesaProductos } from '../mesa/mesa-productos';
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

  mesa: Mesa = new Mesa();
  usuario: string;

  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private mesaService: MesaService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.usuario= this.tokenService.getUsuario();
    this.activatedRoute.paramMap.subscribe(params =>{
      let id = +params.get('id');
      this.mesaService.getMesa(id).subscribe(mesa => this.mesa.id = id);
    });
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
    console.log(producto);

    if(this.existeProducto(producto.id)){
      this.incrementaCantidad(producto.id);
    }else{
      if(this.existeStock(producto.id)){
        let nuevoProducto = new MesaProductos();
        nuevoProducto.producto = producto;
        console.log(nuevoProducto);
        this.mesa.productos.push(nuevoProducto);
        console.log(this.mesa);
      }
      swal.fire('Producto sin stock', 'No queda más stock de este producto', 'warning')
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

    this.mesa.productos.forEach((item: MesaProductos) => {
      if( item.producto.stock > 0){
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

  update():void{
    this.mesaService.update(this.mesa).subscribe(user => {
        swal.fire('Mesa guardada',`Mesa ${this.mesa.id} guardada con éxito`, 'success')
    });
  }

  pagarMesa(mesaForm): void{
    this.mesaService.delete(this.mesa.id);
    swal.fire('Mesa Pagada',`Mesa ${this.mesa.id} pagada con éxito!`, 'success');
  }

}
