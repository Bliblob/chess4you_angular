import { Component, OnInit } from '@angular/core';
import { Line } from '../data-structure/Line';
import { LobbyService } from 'src/lobby.service';
import { ILobby } from 'src/data-structure/Lobby';
import { ActivatedRoute } from '@angular/router';
import { Pieces } from 'src/data-structure/chess/pieces/Pieces';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent implements OnInit {

  uuid: String;
  Lobby: ILobby;
  ChessBoard: Line[] = new Array();
  BlackPiecesOne: Pieces[] = new Array();
  BlackPiecesTwo: Pieces[] = new Array();
  WhitePiecesOne: Pieces[] = new Array();
  WhitePiecesTwo: Pieces[] = new Array();
  EmptyPieces: Pieces[] = new Array();

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
    let ListPiece: Pieces[] = new Array();
    const Char: String[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    this.createPieces();

    for (let row = 0; row < 8; row++) {
      let ColorLine: Boolean[] = new Array();
      let IdLine: String[] = new Array();
      for (let line = 0; line < 8; line++) {
        ColorLine.push(Switch);
        Id = 8 - row;
        IdLine.push(Char[line] + Id.toString());
        Switch = Switch ? false : true;
      }
      switch (row) {
        case 0:
          ListPiece = this.WhitePiecesOne;
          break;
        case 1:
          ListPiece = this.WhitePiecesTwo;
          break;
        case 6:
          ListPiece = this.BlackPiecesOne;
          break;
        case 7:
          ListPiece = this.BlackPiecesTwo;
          break;
        default:
          ListPiece = new Array();
          break;
      }
      this.ChessBoard.push(new Line(IdLine, ColorLine, ListPiece));
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
    const sequenceWhite = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'];
    const sequenceBlack = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'r', 'n', 'b', 'k', 'q', 'b', 'n', 'r'];

    for (let row = 0; row < 8; ++row) {
      this.WhitePiecesOne.push(new Pieces(firstPart + sequenceWhite[row] + white));
      this.WhitePiecesTwo.push(new Pieces(firstPart + sequenceWhite[16 - row] + white));
      this.BlackPiecesOne.push(new Pieces(firstPart + sequenceBlack[row] + black));
      this.BlackPiecesTwo.push(new Pieces(firstPart + sequenceBlack[16 - row] + black));
      this.EmptyPieces.push(new Pieces(''));
      this.EmptyPieces.push(new Pieces(''));
    }
  }

  getImg(pieces: Pieces): String {
    return !pieces ? '' : '../assets/chess_board_pieces/' + pieces.name;
  }

  moveFigure(Id: String): void {


    alert("hallo");
  }
}
