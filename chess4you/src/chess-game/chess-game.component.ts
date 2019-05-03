import { Component, OnInit } from '@angular/core';
import { Line } from '../data-structure/Line';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent implements OnInit {

  Switch: Boolean = true;
  Size: Number = 8;
  ChessBoard: Line[] = [];

  constructor() { }
  ngOnInit() {
    for (let index1 = 0; index1 < this.Size; index1++) {
        if (this.Switch) {
          this.ChessBoard[index1] =  new Line(this.Switch);
          //this.ChessBoard[index1][index2] = this.Switch;
          this.Switch = false;
        } else {
          this.ChessBoard[index1] = new Line(this.Switch);
          //this.ChessBoard[index1][index2] = this.Switch;
          this.Switch = true;
      }
      this.Switch = this.Switch === true ? false : true;
    }
  }
}
