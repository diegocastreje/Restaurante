import { Producto } from '../../productos/producto';

export class MesaProductos {

  producto: Producto;
  cantidad: number = 1;
  importe: number;

  public calcularImporte(): number{
    this.importe = this.cantidad*this.producto.precio;
    return this.importe;
  }
}
