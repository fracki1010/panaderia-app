import { Cliente } from "../dominio/entidades/cliente";
import { RepositorioDeClientes } from "../dominio/puertos_de_repositorio/repositorio_de_clientes";

export class RepositorioDeClientesEnMemoria implements RepositorioDeClientes {
    private clientes: Map<number, Cliente> = new Map();

    constructor() {
        this.inicializarClientesDemo();
    }

    private inicializarClientesDemo(): void {
        this.agregarCliente({ id: 1, nombre: "Panadería El Molino", direccion: "Av. Principal 123" });
        this.agregarCliente({ id: 2, nombre: "Cafetería La Esquina", direccion: "Calle 45 N° 678" });
        this.agregarCliente({ id: 3, nombre: "Restaurante Sabor Casero", direccion: "Blvd. Central 890" });
        this.agregarCliente({ id: 4, nombre: "Hotel Las Palmas", direccion: "Ruta 7 Km 5" });
        this.agregarCliente({ id: 5, nombre: "Supermercado La Familia", direccion: "Av. Libertad 456" });
    }

    async agregarCliente(cliente: Cliente): Promise<void> {
        this.clientes.set(cliente.id, cliente);
    }

    async obtenerClientePorId(id: number): Promise<Cliente | null> {
        return this.clientes.get(id) ?? null;
    }

    async obtenerTodosLosClientes(): Promise<Cliente[]> {
        return Array.from(this.clientes.values());
    }
}
