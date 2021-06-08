import { MesaProductos } from './mesa-productos';

export class Mesa {
  id: number;
  fecha: string;
  productos: MesaProductos[] = [];
  total: number;

  calcularTotal(): number{
    this.total = 0;
    this.productos.forEach((item: MesaProductos) =>{
      this.total += item.calcularImporte();
    });
    return this.total;
  }
}
