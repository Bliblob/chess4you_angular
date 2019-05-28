export interface ILobby {
    Name: string;
    StartGame: Boolean;
    PlayerOne: IPlayer;
    PlayerTwo: IPlayer;
}

export interface IPlayer {
    Id: string;
    Name: string;
    Color: Boolean;
}
