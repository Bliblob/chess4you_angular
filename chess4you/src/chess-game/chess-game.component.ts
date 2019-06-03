import { Component, OnInit } from '@angular/core';
import { LobbyService } from 'src/lobby.service';
import { ILobby } from 'src/data-structure/Lobby';
import { ActivatedRoute } from '@angular/router';
import { ChessGameServiceService } from 'src/services/chess-game-service.service';
import { TurnService } from 'src/services/turn.service';
import { Movement } from 'src/data-structure/chess/Movement';
import { Player } from '@angular/core/src/render3/interfaces/player';
import { Position } from '../data-structure/chess/Position';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent implements OnInit {

  lobbyUUID: string;
  playerUUID: string;
  chessBoard: ChessBoard = new ChessBoard();
  movement: Movement = new Movement();
  reverse: boolean = false;

  currPos: string;
  newPos: string;
  movements: Movement[] = [];
  lobby: ILobby;
  info: Info;
  counter: Date;

  constructor(
    private gameService: ChessGameServiceService,
    private turnService: TurnService,
    private lobbyService: LobbyService,
    private route: ActivatedRoute
    ) { }

  async ngOnInit() {
    this.lobbyUUID = this.route.snapshot.paramMap.get('lobbyUUID');
    this.playerUUID = this.route.snapshot.paramMap.get('playerUUID');
    await this.getLobbyData();
    await this.getGameData(this.lobbyUUID, this.playerUUID);
  }

  async getLobbyData() {
    await this.lobbyService.getLobby(this.lobbyUUID)
    .toPromise()
    .then( data => {
      this.lobby = data;
    });
  }

  async getGameData(lobbyUUID: string, playerUUID: string) {
    await this.gameService.getPieces(lobbyUUID, playerUUID)
    .toPromise()
    .then(
      data => {
        this.chessBoard = <ChessBoard>data;
      });
      if (this.lobby.PlayerOne.Id === playerUUID) {
        if (this.lobby.PlayerOne.Color === 'White') {
          for (let y = 0; y < 4; y++) {
            let tmpOne = this.chessBoard[y];
            let tmpTwo = this.chessBoard[7 - y];
            this.chessBoard[y] = tmpTwo;
            this.chessBoard[7 - y] = tmpOne;
          }
          this.reverse = true;
        }
      }
  }

  setCoordinate(x: number, y: number) {
    if (this.reverse) {
      return (7 - y) + ',' + (7 - x);
    }
    return y + ',' + x;
  }

  getImg(field: any): string {
    return !field.piece ? '../assets/chess_board_pieces/transparent.png' : '../assets/chess_board_pieces/' + field.piece.name + '.svg';
  }

  setImg(){
    return '../assets/chess_board_pieces/transparent.png';
  }

  moveFigure(event: Event, field: any) {
    if (!field.piece){
      alert('Bitte wählen Sie eine Figur aus.');
    } else if (!this.currPos) {
      this.currPos = (event.target as Element).id;
      this.getPossiblePositions(this.currPos);
      this.changeBackgroundColor(this.movements);
      console.log('currPos: ' + this.currPos);
    } else if (!this.newPos) {
      let tmpElement = (event.target as Element);
      if (this.currPos === tmpElement.id) {
        alert ('Bitte wählen Sie eine neue Position aus.');
        console.log('newPos: ' + this.newPos);
      } else if (tmpElement.classList.contains('has-background-success')) {
        this.newPos = tmpElement.id;
        console.log('newPos: ' + this.newPos);
        this.changeFigure(this.currPos, this.newPos);
        this.resetBackgroundColor(this.movements);
      }
    } 
  }

  async getPossiblePositions(currPos: string) {
// tslint:disable-next-line: radix
    const currY: number = Number.parseInt(currPos.substring(0, 1));
// tslint:disable-next-line: radix
    const currX: number = Number.parseInt(currPos.substring(2, 3));
    this.movements = new Array();
    await this.turnService.getTurn(this.lobbyUUID, this.playerUUID, new Position(currY, currX))
    .toPromise()
    .then(
      data => {
        console.log(data);
        this.movements = data;
      });
      console.log(this.movements);
  }

  changeFigure(currPos: string, newPos: string) {
    let currY: number = Number.parseInt(currPos.substring(0,1));
    let currX: number = Number.parseInt(currPos.substring(2,3));
    let newY: number = Number.parseInt(newPos.substring(0,1));
    let newX: number = Number.parseInt(newPos.substring(2,3));
    let currPiece = this.chessBoard.ChessBoard[currY][currX];
    let newPiece = this.chessBoard.ChessBoard[newY][newX];
    this.chessBoard.ChessBoard[currY][currX] = newPiece;
    this.chessBoard.ChessBoard[newY][newX] = currPiece;
  }

  resetBackgroundColor(movements: Movement[]) {
    movements.forEach( movement => {
      document.getElementById(movement.newPosition.PosY + ',' + movement.newPosition.PosX).classList.remove('has-background-success');
    })
  }

  changeBackgroundColor(movements: Movement[]) {
    movements.forEach( movement => {
      document.getElementById(movement.newPosition.PosY + ',' + movement.newPosition.PosX).classList.add('has-background-success');
    })
  }
}

export class ChessBoard {
  ChessBoard: [];
}

export class Info {
  currentPlayer: Player;
  timestamp: Date;
}
