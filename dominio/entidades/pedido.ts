import { Cliente } from "./cliente";
import { ProductoDetalle } from "./producto_detalle";

export interface Pedido {
    id: number;
    fecha: Date;
    cliente: Cliente;
    detalleProductos: ProductoDetalle[];
}
