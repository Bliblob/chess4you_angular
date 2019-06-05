import { Info } from "src/chess-game/chess-game.component";
import { Field } from "src/data-structure/chess/field/Field";
import { Observable } from "rxjs";
import { Server } from "https";
import { Url } from "url";
import { Player } from "src/data-structure/Lobby";
import { Movement } from "src/data-structure/chess/Movement";

export interface IGameService {

   info: Observable<Info>;
   board: Observable<Field[][]>;

   connect(urlServer: Url,uuidLobby: string, uuidPlayer: string);

   getInfo(urlServer: Url,uuidLobby: string, uuidPlayer: string);

   getBoard(urlServer: Url,uuidLobby: string, uuidPlayer: string);

   getTurn(urlServer: Url, uuidPlayer: string, uuidLobby: string, position: Position);

   doTurn(urlServer: Url, uuidPlayer: string, uuidLobby: string, movement: Movement);
}
