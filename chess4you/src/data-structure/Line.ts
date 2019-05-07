import { Field } from './chess/field/Field';
import { Pieces } from './chess/pieces/Pieces';

export class Line {
    FieldLine: Field[];
    constructor(IdLine: String[], ColorLine: Boolean[], ListPieces: Pieces[]) {
        this.FieldLine = new Array();
        for (let index = 0; index < IdLine.length; index++) {
            this.FieldLine.push(new Field(IdLine[index], ColorLine[index], ListPieces[index]));
        }
    }
}
