import { MateriaPrimaDetalle } from "./materia_prima_detalle"; // o ponelo en el mismo archivo si preferís

export interface OrdenDeCargaDeMateriaPrima {
    id: number;
    detalle: MateriaPrimaDetalle[];
    fechaOrden: Date; // Date en JS es equivalente a DateTime de Dart
}
