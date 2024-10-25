import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css', './other.component.css']
})
export class PlayerComponent implements OnInit {
  currentShowPlayerElements: boolean = false;
  currentUserName: string = '';
  currentUserNameInitials: string = '';

  currentDontShowPlayerElements: boolean = true;
  currentChangeCardBackground: boolean = false;
  currentShowButton: boolean = false;
  currentShowUserCard: boolean = false;
  currentGenerateNumbers: boolean = false;
  currentShowSelectedNumbers: boolean = false;
  currentShowToastedMessage: boolean = false;

  userPermission: {[key: string]: boolean} = {}
  numbers: number[] = [];
  selectedCard: { [key: number]: boolean } = {};
  selectedCardQuestion: boolean = false;
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

  public createAndResetSelectedCardValues(): void {
    // create selectedCards and boolean values or reset values
    this.numbers.forEach(number => {
      this.selectedCard[number] = false;
    });
    this.selectedCardQuestion = false;
  }

  public changeCardMode(cardMode: string): void {
    for (const key in this.selectedCardMode) {
      this.selectedCardMode[key] = false;
    }
    this.selectedCardMode[cardMode] = true;

    if (this.currentShowButton === true) {
      this.currentShowButton = false;
      this.currentShowUserCard = false;
      this.currentChangeCardBackground = false;
    }
  }

  public generateNumbers(cardMode: string): void {
    this.numbers = [];
    
    this.changeCardMode(cardMode);

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

    this.selectedCard = {};
    this.createAndResetSelectedCardValues()
  }

  public selectCard(cardNumber: number) {
    this.createAndResetSelectedCardValues()
    this.selectedNumbers = [];

    if (cardNumber < 0) {
      this.selectedCardQuestion = true;
      // agregar numero aleatorio a selectedNumbers
      const randomIndex = Math.floor(Math.random() * 10);
      this.selectedNumbers.push(this.numbers[randomIndex]);      

    } else {      
      this.selectedCard[cardNumber] = true
      // agregar numero seleccionado a selectedNumbers
      this.selectedNumbers.push(cardNumber);
    }

    // show button Revelar Cartas
    this.currentShowButton = true;
    this.currentShowUserCard = true;
    // show toasted message
    this.currentShowToastedMessage = true;
    // build and calculated variables
    this.buildVariables();
    // change other cards background
    this.changeCardBackground();
  }

  public buildVariables():void {
    // reset variables
    this.uniqueNumbers = {};

    // 6 números aleatorios de los 10 generados + numero seleccionado (se pueden repetir)
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 10);
      this.selectedNumbers.push(this.numbers[randomIndex]);
    }

    // promedio de los 6 numeros aleatorios + numero seleccionado
    this.average = this.selectedNumbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this.selectedNumbers.length;

    // contar numeros repetidos de los 6 numeros aleatorios + numero seleccionado
    this.selectedNumbers.forEach(number => {
      this.uniqueNumbers[number] = (this.uniqueNumbers[number] || 0) + 1;
    });

    // +1 para agregar un grid en el template
    this.uniqueNumbersLength = Object.keys(this.uniqueNumbers).length + 1;
  }

  public showCardsAndAverage(): void {
    this.currentShowButton = false;
    this.currentGenerateNumbers = true;
    this.showCardMode = false;

    setTimeout(() => {
      this.currentShowUserCard = false;
      this.currentShowPlayerElements = false;
      this.currentGenerateNumbers = false;
      this.currentChangeCardBackground = false;
      this.currentShowSelectedNumbers = true;
    }, 2000);
  }

  public nuevaVotacion(): void {
    this.createAndResetSelectedCardValues()
    this.currentShowSelectedNumbers = false;
    this.currentShowPlayerElements = true;
    this.showCardMode = true;
    this.generateNumbers('F')
  }

  public changeCardBackground(): void {
    setTimeout(() => {
      this.currentChangeCardBackground = true;
      this.currentShowToastedMessage = false;
    }, 2000);
  }

  public chargeElements(): void {
    setTimeout(() => {
      this.currentDontShowPlayerElements = false;
    }, 1000);
  }

  public makeAdmin(user: string): void {
    this.userPermission[user] = true;
  }

  ngOnInit() {
    this.generateNumbers('F');
    this.chargeElements();

    this.gameService.currentShowPlayerElements.subscribe(showPlayerElements => {
      this.currentShowPlayerElements = showPlayerElements;
    });

    this.authService.currentUserName.subscribe(userName => {
      this.currentUserName = userName;
      this.currentUserNameInitials = userName.toUpperCase().slice(0, 2);
    });

    this.userPermission = {
      'Carlos': false,
      'David': true,
      'Nata': false,
      'Vale': false,
      'Pedro': false,
      'Oscar': false,
      'Albert': false,
      currentUserName: true,
    };

  }
}
