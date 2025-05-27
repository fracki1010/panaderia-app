import { MateriaPrima } from "../dominio/entidades/materia_prima";
import { RepositorioDeMateriasPrimas } from "../dominio/puertos_de_repositorio/repositorio_de_materia_prima";

export class RepositorioDeMateriasPrimasEnMemoria implements RepositorioDeMateriasPrimas {
    private materiasPrimas: Map<number, MateriaPrima> = new Map();

    constructor() {
        this.inicializarMateriasPrimasDemo();
    }

    private inicializarMateriasPrimasDemo(): void {
        this.agregarMateriaPrima({ id: 1, descripcion: "Harina de trigo", cantidadDisponible: 50000 });
        this.agregarMateriaPrima({ id: 2, descripcion: "Levadura fresca", cantidadDisponible: 2000 });
        this.agregarMateriaPrima({ id: 3, descripcion: "Sal fina", cantidadDisponible: 5000 });
        this.agregarMateriaPrima({ id: 4, descripcion: "Azúcar", cantidadDisponible: 10000 });
        this.agregarMateriaPrima({ id: 5, descripcion: "Manteca", cantidadDisponible: 8000 });
        this.agregarMateriaPrima({ id: 6, descripcion: "Huevos", cantidadDisponible: 500 });
        this.agregarMateriaPrima({ id: 7, descripcion: "Leche", cantidadDisponible: 15000 });
        this.agregarMateriaPrima({ id: 8, descripcion: "Frutas confitadas", cantidadDisponible: 3000 });
        this.agregarMateriaPrima({ id: 9, descripcion: "Dulce de leche", cantidadDisponible: 5000 });
        this.agregarMateriaPrima({ id: 10, descripcion: "Grasa", cantidadDisponible: 6000 });
    }

    async agregarMateriaPrima(materiaPrima: MateriaPrima): Promise<void> {
        this.materiasPrimas.set(materiaPrima.id, materiaPrima);
    }

    async obtenerMateriaPrimaPorId(id: number): Promise<MateriaPrima | null> {
        return this.materiasPrimas.get(id) ?? null;
    }

    async obtenerTodasLasMateriasPrimas(): Promise<MateriaPrima[]> {
        return Array.from(this.materiasPrimas.values());
    }
}
