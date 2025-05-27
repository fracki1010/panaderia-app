import { Cliente } from "../entidades/cliente";

export interface RepositorioDeClientes {
    agregarCliente(cliente: Cliente): Promise<void>;
    obtenerClientePorId(id: number): Promise<Cliente | null>;
    obtenerTodosLosClientes(): Promise<Cliente[]>;
}
