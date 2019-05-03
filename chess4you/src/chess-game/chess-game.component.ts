import { Component, OnInit } from '@angular/core';
import { Line } from '../data-structure/Line';
import { Field } from '../data-structure/Line';
import { LobbyService } from 'src/lobby.service';
import { ILobby } from 'src/data-structure/Lobby';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent implements OnInit {

  uuid: String;
  Lobby: ILobby;
  ChessBoard: Line[] = new Array();

  constructor(private lobbyService: LobbyService) { }
  ngOnInit() {
    this.createChessBoard("b533adca-12eb-4ac0-91e2-cea1059a90af");
  }

  createChessBoard(uuid: String) {
    this.getGameData(uuid);
    let Switch: Boolean = true;
    let Id: Number;
    const Char: String[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let row = 0; row < 8; row++) {
      let ColorLine: Boolean[] = new Array();
      let IdLine: String[] = new Array();
      for (let line = 0; line < 8; line++) {
        ColorLine.push(Switch);
        Id = 9 - row;
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
}
