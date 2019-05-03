export class Field {
    Id: String;
    Color: Boolean;
    constructor(Id: String, Color: Boolean) {
        this.Id = Id;
        this.Color = Color;
    }
}

export class Line {
    FieldLine: Field[];
    constructor(IdLine: String[], ColorLine: Boolean[]) {
        this.FieldLine = new Array();
        for (let index = 0; index < IdLine.length; index++) {
            this.FieldLine.push(new Field(IdLine[index], ColorLine[index]));
        }
    }
}
