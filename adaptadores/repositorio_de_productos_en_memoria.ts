import { MateriaPrimaRequerida } from "../dominio/entidades/materia_prima_requerida";
import { Producto } from "../dominio/entidades/producto";
import { RepositorioDeMateriasPrimas } from "../dominio/puertos_de_repositorio/repositorio_de_materia_prima";
import { RepositorioDeProductos } from "../dominio/puertos_de_repositorio/repositorio_de_productos";

export class RepositorioDeProductosEnMemoria implements RepositorioDeProductos {
    private productos: Map<number, Producto> = new Map();
    private repositorioMateriasPrimas: RepositorioDeMateriasPrimas;

    constructor(repositorioMateriasPrimas: RepositorioDeMateriasPrimas) {
        this.repositorioMateriasPrimas = repositorioMateriasPrimas;
        this.inicializarProductosDemo();
    }


    private async inicializarProductosDemo(): Promise<void> {
        const materiasPrimas = await this.repositorioMateriasPrimas.obtenerTodasLasMateriasPrimas();

        const getMateriaPrima = (id: number) =>
            materiasPrimas.find((mp) => mp.id === id)!;

        await this.agregarProducto(
            new Producto(1, "Pan Francés", 100.0, [
                new MateriaPrimaRequerida(getMateriaPrima(1), 500),
                new MateriaPrimaRequerida(getMateriaPrima(2), 20),
                new MateriaPrimaRequerida(getMateriaPrima(3), 10),
                new MateriaPrimaRequerida(getMateriaPrima(10), 30),
            ])
        );

        await this.agregarProducto(
            new Producto(2, "Medialunas", 120.0, [
                new MateriaPrimaRequerida(getMateriaPrima(1), 500),
                new MateriaPrimaRequerida(getMateriaPrima(2), 20),
                new MateriaPrimaRequerida(getMateriaPrima(4), 50),
                new MateriaPrimaRequerida(getMateriaPrima(5), 200),
                new MateriaPrimaRequerida(getMateriaPrima(6), 2),
            ])
        );

        await this.agregarProducto(
            new Producto(3, "Pan de Molde", 180.0, [
                new MateriaPrimaRequerida(getMateriaPrima(1), 700),
                new MateriaPrimaRequerida(getMateriaPrima(2), 25),
                new MateriaPrimaRequerida(getMateriaPrima(3), 15),
                new MateriaPrimaRequerida(getMateriaPrima(5), 50),
                new MateriaPrimaRequerida(getMateriaPrima(7), 200),
            ])
        );

        await this.agregarProducto(
            new Producto(4, "Rosca de Pascua", 500.0, [
                new MateriaPrimaRequerida(getMateriaPrima(1), 500),
                new MateriaPrimaRequerida(getMateriaPrima(2), 25),
                new MateriaPrimaRequerida(getMateriaPrima(4), 150),
                new MateriaPrimaRequerida(getMateriaPrima(5), 100),
                new MateriaPrimaRequerida(getMateriaPrima(6), 3),
                new MateriaPrimaRequerida(getMateriaPrima(8), 100),
            ])
        );

        await this.agregarProducto(
            new Producto(5, "Facturas", 90.0, [
                new MateriaPrimaRequerida(getMateriaPrima(1), 400),
                new MateriaPrimaRequerida(getMateriaPrima(2), 20),
                new MateriaPrimaRequerida(getMateriaPrima(4), 80),
                new MateriaPrimaRequerida(getMateriaPrima(5), 150),
                new MateriaPrimaRequerida(getMateriaPrima(6), 2),
                new MateriaPrimaRequerida(getMateriaPrima(9), 200),
            ])
        );
    }

    async agregarProducto(producto: Producto): Promise<void> {
        this.productos.set(producto.id, producto);
    }

    async obtenerProductoPorId(id: number): Promise<Producto | null> {
        const producto = this.productos.get(id);
        return producto !== undefined ? producto : null;
    }

    async obtenerTodosLosProductos(): Promise<Producto[]> {
        return Array.from(this.productos.values());
    }
}
