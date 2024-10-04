import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-spectator',
  templateUrl: './spectator.component.html',
  styleUrl: './spectator.component.css'
})
export class SpectatorComponent {
  currentShowEspectatorElements: boolean = false;
  currentUserName: string = '';
  currentUserNameInitials: string = '';

  currentDontShowSpectatorElements: boolean = true;
  currentChangeCardBackground: boolean = false;
  currentShowButton: boolean = false;
  currentGenerateNumbers: boolean = false;
  currentShowSelectedNumbers: boolean = false;

  numbers: number[] = [];
  selectedNumbers: number[] = [];
  uniqueNumbers: Set<number> = new Set();

  constructor(private gameService: GameService, private authService: AuthService) {}

  public generateNumbers(): void {
    this.currentShowButton = false;
    this.currentGenerateNumbers = true;

    const uniqueNumbers = new Set<number>();
    while (uniqueNumbers.size < 10) {
      uniqueNumbers.add(Math.floor(Math.random() * 99) + 1);
    }
    this.numbers = Array.from(uniqueNumbers);
    console.log("10 numbers:", this.numbers)

    // Selecciona aleatoriamente 7 números de los 10 generados
    this.selectedNumbers = [];
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * 10);
      this.selectedNumbers.push(this.numbers[randomIndex]);
    }
    console.log("numbers selected:", this.selectedNumbers)

    this.uniqueNumbers = new Set(this.selectedNumbers);
    console.log("unique numbers:", this.uniqueNumbers)

    setTimeout(() => {
      this.currentGenerateNumbers = false;
      this.currentChangeCardBackground = false;
      this.currentShowSelectedNumbers = true;
    }, 2000);
  }

  public chargeElements(): void {
    setTimeout(() => {
      this.currentDontShowSpectatorElements = false;
    }, 1000);
  }

  public changeCardBackground(): void {
    setTimeout(() => {
      this.currentChangeCardBackground = true;
      this.currentShowButton = true;
    }, 2000);
  }

  ngOnInit() {
    this.gameService.currentEspectatorElements.subscribe(showEspectatorElements => {
      this.currentShowEspectatorElements = showEspectatorElements;
    });

    this.authService.currentUserName.subscribe(userName => {
      this.currentUserName = userName;
      this.currentUserNameInitials = userName.toUpperCase().slice(0, 2);
    });

    this.chargeElements()
    this.changeCardBackground()
  }

}
