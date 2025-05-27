import { Producto } from "../entidades/producto";

export interface RepositorioDeProductos {
    agregarProducto(producto: Producto): Promise<void>;
    obtenerProductoPorId(id: number): Promise<Producto | null>;
    obtenerTodosLosProductos(): Promise<Producto[]>;
}
