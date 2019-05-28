import { Component, OnInit } from '@angular/core';
import { LobbyService } from 'src/lobby.service';
import { ILobby } from 'src/data-structure/Lobby';
import { ActivatedRoute } from '@angular/router';
import { Piece } from 'src/data-structure/chess/pieces/Piece';
import { ChessGameServiceService } from 'src/services/chess-game-service.service';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent implements OnInit {

  uuid: string;
  chessBoard: IChessBoard;
  lobby: ILobby;

  constructor(
    private lobbyService: LobbyService,
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
    this.getLobbyData(this.uuid);
  }
  async getLobbyData(uuid: string): Promise<void> {
    await this.lobbyService.getLobby(uuid)
    .toPromise()
    .then(
      data => {
        this.lobby = data;
      }
    );
  }

  async getGameData(uuid: String): Promise<void> {
    await this.gameService.getChessBoard(uuid)
    .toPromise()
    .then(
      data => {
        this.chessBoard = <IChessBoard>data;
      });
  }

  getImg(pieces: Piece): String {
    return !pieces ? '' : './assets/chess_board_pieces/' + pieces.name + '.svg'
  }

  moveFigure(Id: String): void {
    let initClick;
    let goToClick;
  }
}
export class IChessBoard {
  ChessBoard: [];
}
