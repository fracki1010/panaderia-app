import { Pedido } from "../entidades/pedido";

export interface RepositorioDePedidos {
    agregarPedido(pedido: Pedido): Promise<void>;
    obtenerPedidoPorId(id: number): Promise<Pedido | null>;
    obtenerTodosLosPedidos(): Promise<Pedido[]>;
}
