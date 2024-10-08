import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrl: './game-table.component.css'
})
export class GameTableComponent implements OnInit {
  showSelectRoleElements: boolean = true;

  constructor(private readonly gameService: GameService ) {}

  ngOnInit() {
    this.gameService.currentShowSelectRoleElements.subscribe(showSelectRoleElements => {
      this.showSelectRoleElements = showSelectRoleElements;
    });
  }

}
