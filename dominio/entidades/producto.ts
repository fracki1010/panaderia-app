import { MateriaPrimaRequerida } from "./materia_prima_requerida";

export class Producto {
    constructor(
        public id: number,
        public nombre: string,
        public precio: number,
        public materiasPrimasRequeridas: MateriaPrimaRequerida[]
    ) { }
}
