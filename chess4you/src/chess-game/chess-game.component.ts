import { Component, OnInit } from '@angular/core';
import { Line } from '../data-structure/Line';
import { LobbyService } from 'src/lobby.service';
import { ILobby } from 'src/data-structure/Lobby';
import { ActivatedRoute } from '@angular/router';
import { Pieces } from 'src/data-structure/chess/pieces/Pieces';
import { Field } from 'src/data-structure/chess/field/Field';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent implements OnInit {

  uuid: String;
  Lobby: ILobby;
  ChessBoard: Line[] = new Array();
  BlackPieces: Pieces[] = new Array();
  WhitePieces: Pieces[] = new Array();



  constructor(
    private lobbyService: LobbyService,
    private route: ActivatedRoute
    ) { }
  ngOnInit() {
    this.getGame();
  }

  getGame() {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    this.getGameData(this.uuid);
    this.createChessBoard();
  }

  createChessBoard() {
    let Switch: Boolean = true;
    let Id: Number;
    const Char: String[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let row = 0; row < 8; row++) {
      let ColorLine: Boolean[] = new Array();
      let IdLine: String[] = new Array();
      for (let line = 0; line < 8; line++) {
        ColorLine.push(Switch);
        Id = 8 - row;
        IdLine.push(Char[line] + Id.toString());
        Switch = Switch ? false : true;
      }
      this.ChessBoard.push(new Line(IdLine, ColorLine));
      Switch = Switch ? false : true;
      ColorLine = new Array();
      IdLine = new Array();
    }
    console.log(this.ChessBoard);
  }

  getGameData(uuid: String) {
    this.lobbyService.getLobby(uuid).subscribe(
      data => this.Lobby = data
    );
  }

  createPieces(): void {
    const firstPart = 'Chess_';
    const white = 'lt45.svg';
    const black = 'dt45.svg';
    const sequenzewhite
     = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'];
    for (let row = 0; row < 16; ++row) {
      this.WhitePieces.push(new Pieces(firstPart + sequenzewhite[row] + white));
      this.BlackPieces.push(new Pieces(firstPart + sequenzewhite[row] + black));
    }
  }
}
