import { Field } from './chess/field/Field';

export class Line {
    FieldLine: Field[];
    constructor(IdLine: String[], ColorLine: Boolean[]) {
        this.FieldLine = new Array();
        for (let index = 0; index < IdLine.length; index++) {
            this.FieldLine.push(new Field(IdLine[index], ColorLine[index], null));
        }
    }
}
