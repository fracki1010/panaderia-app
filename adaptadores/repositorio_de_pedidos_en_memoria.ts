import { Pedido } from "../dominio/entidades/pedido";
import { RepositorioDePedidos } from "../dominio/puertos_de_repositorio/respositorio_de_pedidos";

export class RepositorioDePedidosEnMemoria implements RepositorioDePedidos {
    private pedidos: Map<number, Pedido> = new Map();

    async agregarPedido(pedido: Pedido): Promise<void> {
        this.pedidos.set(pedido.id, pedido);
    }

    async obtenerPedidoPorId(id: number): Promise<Pedido | null> {
        return this.pedidos.get(id) ?? null;
    }

    async obtenerTodosLosPedidos(): Promise<Pedido[]> {
        return Array.from(this.pedidos.values());
    }
}
