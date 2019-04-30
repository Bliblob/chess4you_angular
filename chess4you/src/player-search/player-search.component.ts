import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit {

  constructor() { }
  txtLoading: string;
  ngOnInit() {
  }

  searchForGame() {
    this.txtLoading = '↻...loading';
  }

  searchGame(){
    document.getElementById('searchGame').className = "button is-info is-outlined is-loading";
  }

  showLobby(){
    window.open('./lobby', '_self');
  }
}
