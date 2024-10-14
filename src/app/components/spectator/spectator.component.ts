import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-spectator',
  templateUrl: './spectator.component.html',
  styleUrl: './spectator.component.css'
})
export class SpectatorComponent implements OnInit {
  currentShowSpectatorElements: boolean = false;
  currentUserName: string = '';
  currentUserNameInitials: string = '';

  currentDontShowSpectatorElements: boolean = true;
  currentChangeCardBackground: boolean = false;
  currentShowButton: boolean = false;
  currentGenerateNumbers: boolean = false;
  currentShowSelectedNumbers: boolean = false;

  userPermission: {[key: string]: boolean} = {};
  numbers: number[] = [];
  selectedNumbers: number[] = [];
  average: number = 0;
  uniqueNumbers: { [key: number]: number } = {};
  uniqueNumbersLength: number = 0;
  selectedCardMode: {[key: string]: boolean} = {
    'F': true,
    'A': false,
    'P': false
  };
  showCardMode: boolean = true;

  constructor(
    private readonly gameService: GameService, 
    private readonly authService: AuthService,
  ) {}

  public changeCardMode(cardMode: string): void {
    // calculate numbers
    this.numbers = [];

    if (cardMode == 'F') { // 10 numeros de fibonacci
      this.numbers = [0, 1, 3, 5, 8, 13, 21, 34, 55, 89];

    } else if (cardMode == 'P') { // 10 numeros potencia
      this.numbers = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81];

    } else { // 10 numeros aleatorios diferentes (no se pueden repetir)      
      const uniqueNumbers = new Set<number>();
      while (uniqueNumbers.size < 10) {
        uniqueNumbers.add(Math.floor(Math.random() * 99) + 1);
      }
      this.numbers = Array.from(uniqueNumbers);
      // ordenar los 10 numeros de menor a mayor
      this.numbers.sort((a, b) => a - b);
    }
    
    // changeStyles
    for (const key in this.selectedCardMode) {
      this.selectedCardMode[key] = false;
    }
    this.selectedCardMode[cardMode] = true;
    
    if (this.currentShowButton === true) {
      
      this.currentShowButton = false;
      this.currentChangeCardBackground = false;

      setTimeout(() => {
        this.currentShowButton = true;
        this.currentChangeCardBackground = true;
      }, 2000);
    }
  }

  public generateNumbers(): void {
    this.currentShowButton = false;
    this.currentGenerateNumbers = true;
    this.showCardMode = false;
    
    // 7 números aleatorios de los 10 generados (se pueden repetir)
    this.selectedNumbers = [];
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * 10);
      this.selectedNumbers.push(this.numbers[randomIndex]);
    }

    // promedio de los 7 numeros aleatorios
    this.average = this.selectedNumbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this.selectedNumbers.length;

    // contar numeros repetidos de los 7 numeros aleatorios
    this.uniqueNumbers = {};
    this.selectedNumbers.forEach(number => {
      this.uniqueNumbers[number] = (this.uniqueNumbers[number] || 0) + 1;
    });
    this.uniqueNumbersLength = Object.keys(this.uniqueNumbers).length + 1;

    setTimeout(() => {
      this.currentGenerateNumbers = false;
      this.currentChangeCardBackground = false;
      this.currentShowSelectedNumbers = true;
    }, 2000);
  }

  public nuevaVotacion(): void {
    this.showCardMode = true;
    this.currentShowSelectedNumbers = false;

    this.changeCardBackground();
    this.changeCardMode('F')
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

  public makeAdmin(user: string): void {
    this.userPermission[user] = true;
  }

  ngOnInit() {
    this.changeCardMode('F')

    this.gameService.currentShowSpectatorElements.subscribe(showSpectatorElements => {
      this.currentShowSpectatorElements = showSpectatorElements;
    });

    this.authService.currentUserName.subscribe(userName => {
      this.currentUserName = userName;
      this.currentUserNameInitials = userName.toUpperCase().slice(0, 2);
    });

    this.chargeElements()
    this.changeCardBackground()

    this.userPermission = {
      'Carlos': false,
      'David': false,
      'Nata': false,
      'Vale': false,
      'Pedro': false,
      'Oscar': false,
      'Albert': false,
      currentUserName: true,
    }
  }

}
