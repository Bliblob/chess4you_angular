import { Info, ChessBoard } from "src/chess-game/chess-game.component";
import { Field } from "src/data-structure/chess/field/Field";
import { Observable } from "rxjs";
import { Url } from "url";
import { Movement } from "src/data-structure/chess/Movement";

export interface IGameService {

   info: Observable<Info>;
   board: Observable<ChessBoard[][]>;

   connect(urlGameServer: Url,uuidLobby: string, uuidPlayer: string);

   getInfo(urlGameServer: Url,uuidLobby: string, uuidPlayer: string);

   getBoard(urlGameServer: Url,uuidLobby: string, uuidPlayer: string);

   getTurn(urlGameServer: Url, uuidPlayer: string, uuidLobby: string, position: Position);

   doTurn(urlGameServer: Url, uuidPlayer: string, uuidLobby: string, movement: Movement);
}
