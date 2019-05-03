export interface ILobby {
    Name: String;
    StartGame: Boolean;
    PlayerOne: IPlayer;
    PlayerTwo: IPlayer;
}

export interface IPlayer {
    Id: String;
    Name: String;
    Color: Boolean;
}
