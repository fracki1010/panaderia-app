import { MateriaPrima } from "../entidades/materia_prima";

export interface RepositorioDeMateriasPrimas {
    agregarMateriaPrima(materiaPrima: MateriaPrima): Promise<void>;
    obtenerMateriaPrimaPorId(id: number): Promise<MateriaPrima | null>;
    obtenerTodasLasMateriasPrimas(): Promise<MateriaPrima[]>;
}
