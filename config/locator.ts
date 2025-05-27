import { RepositorioDeClientesEnMemoria } from "../adaptadores/repositorio_de_clientes_en_memoria";
import { RepositorioDeMateriasPrimasEnMemoria } from "../adaptadores/repositorio_de_materias_primas_en_memoria";
import { RepositorioDePedidosEnMemoria } from "../adaptadores/repositorio_de_pedidos_en_memoria";
import { RepositorioDeProductosEnMemoria } from "../adaptadores/repositorio_de_productos_en_memoria";

import { RepositorioDeClientes } from "../dominio/puertos_de_repositorio/repositorio_de_clientes";
import { RepositorioDeMateriasPrimas } from "../dominio/puertos_de_repositorio/repositorio_de_materia_prima";
import { RepositorioDeProductos } from "../dominio/puertos_de_repositorio/repositorio_de_productos";
import { RepositorioDePedidos } from "../dominio/puertos_de_repositorio/respositorio_de_pedidos";

class ServiceLocator {
    private static instance: ServiceLocator;
    private _repositorioDeClientes: RepositorioDeClientes;
    private _repositorioDeProductos: RepositorioDeProductos;
    private _repositorioDeMateriasPrimas: RepositorioDeMateriasPrimas;
    private _repositorioDePedidos: RepositorioDePedidos;

    private constructor() {
        // Registra todos los servicios como singleton
        this._repositorioDeClientes = new RepositorioDeClientesEnMemoria();
        this._repositorioDeMateriasPrimas = new RepositorioDeMateriasPrimasEnMemoria();
        this._repositorioDeProductos = new RepositorioDeProductosEnMemoria(this._repositorioDeMateriasPrimas);
        this._repositorioDePedidos = new RepositorioDePedidosEnMemoria();
    }

    static getInstance(): ServiceLocator {
        if (!ServiceLocator.instance) {
            ServiceLocator.instance = new ServiceLocator();
        }
        return ServiceLocator.instance;
    }

    get repositorioDeClientes(): RepositorioDeClientes {
        return this._repositorioDeClientes;
    }

    get repositorioDeProductos(): RepositorioDeProductos {
        return this._repositorioDeProductos;
    }

    get repositorioDeMateriasPrimas(): RepositorioDeMateriasPrimas {
        return this._repositorioDeMateriasPrimas;
    }

    get repositorioDePedidos(): RepositorioDePedidos {
        return this._repositorioDePedidos;
    }
}

export const locator = ServiceLocator.getInstance();
