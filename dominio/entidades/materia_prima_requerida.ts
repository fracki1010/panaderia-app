import { MateriaPrima } from "./materia_prima";

export class MateriaPrimaRequerida {
    constructor(
        public materiaPrima: MateriaPrima,
        public cantidad: number
    ) { }
}
