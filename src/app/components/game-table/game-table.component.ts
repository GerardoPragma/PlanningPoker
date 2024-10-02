import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrl: './game-table.component.css'
})
export class GameTableComponent {
  @Input() visible: boolean = true;

}
