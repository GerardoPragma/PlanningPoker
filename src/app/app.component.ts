import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PlanningPoker';
  modalVisible: boolean = false;

  constructor(
    private readonly gameService: GameService,
    private readonly router: Router
  ) {}

  public takeOffLoadingPage(): void {
    setTimeout(() => {
      this.gameService.changeShowLogoAndCrearPartida(true);
      this.router.navigate(['/create-game']);
    }, 2000);
  }

  ngOnInit() {
    this.takeOffLoadingPage();
  }

}
