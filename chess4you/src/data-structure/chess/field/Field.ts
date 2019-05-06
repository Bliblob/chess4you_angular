import { Pieces } from '../pieces/Pieces';

export class Field {
    Id: String;
    Color: Boolean;
    pieces: Pieces;
    constructor(Id: String, Color: Boolean, pieces: Pieces) {
        this.Id = Id;
        this.Color = Color;
        this.pieces = pieces;
    }
}
