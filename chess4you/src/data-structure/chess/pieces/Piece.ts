export class Piece {
    name: String;
    uuid: String;
    position: Position;
    type: Number;

    constructor(name: String) {
        this.name = name;
    }
}

export class Position {
    PosX: Number;
    PosY: Number;
    

}
