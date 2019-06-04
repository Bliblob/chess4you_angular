export interface ILobby {
    Name: string;
    StartGame: Boolean;
    PlayerOne: IPlayer;
    PlayerTwo: IPlayer;

    getListLobbys();
    getLobby();
    initLobby();
    join();
}

export interface IPlayer {
    Id: string;
    Name: string;
    Color: String;
}
