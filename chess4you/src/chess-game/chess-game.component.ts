import { Component, OnInit } from '@angular/core';
import { LobbyService } from 'src/lobby.service';
import { ILobby } from 'src/data-structure/Lobby';
import { ActivatedRoute } from '@angular/router';
import { Piece } from 'src/data-structure/chess/pieces/Piece';
import { Field } from 'src/data-structure/chess/field/Field';
import { ChessGameServiceService } from 'src/services/chess-game-service.service';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent implements OnInit {

  uuid: String;
  chessBoard: Field[][]=[];

  constructor(
    private gameService: ChessGameServiceService,
    private route: ActivatedRoute
    ) { }
    
  ngOnInit() {
    this.getGame();
    console.log(this.chessBoard);
  }

  getGame() {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    this.getGameData(this.uuid);

  }

  async getGameData(uuid: String) {
    await this.gameService.getPieces(uuid)
    .toPromise()
    .then(
      data=>{
        this.chessBoard = <Field[][]>data;
      });
      console.log(this.chessBoard);
  }

  getImg(pieces: Piece): String {
    return !pieces ? '' : './assets/chess_board_pieces/' + pieces.name + '.svg'
  }

  moveFigure(Id: String): void {
    let initClick;
    let goToClick;
  }
  
}