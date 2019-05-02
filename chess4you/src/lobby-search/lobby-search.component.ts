import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby-search',
  templateUrl: './lobby-search.component.html',
  styleUrls: ['./lobby-search.component.css']
})
export class LobbySearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  joinLobby(){
    document.getElementById('join').className = "button is-info is-inverted is-outlined is-loading has-background-white";
  }

}
