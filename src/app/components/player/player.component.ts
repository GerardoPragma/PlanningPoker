import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
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


  cardModes: {[key: string]: []} = {};
  numbers: number[] = [];
  selectedCard: { [key: number]: boolean } = {};
  selectedCardQuestion: boolean = false;
  selectedNumbers: number[] = [];
  average: number = 0;
  uniqueNumbers: { [key: number]: number } = {};
  uniqueNumbersLength: number = 0;

  constructor(
    private readonly gameService: GameService, 
    private readonly authService: AuthService, 
    private readonly modalService: ModalService,
    private readonly router: Router
  ) {}

  public createAndResetSelectedCardValues(): void {
    // create selectedCards and boolean values or reset values
    this.numbers.forEach(number => {
      this.selectedCard[number] = false;
    });
    this.selectedCardQuestion = false;
  }

  public generateNumbers(): void {
    // 10 numeros aleatorios diferentes (no se pueden repetir)
    const uniqueNumbers = new Set<number>();
    while (uniqueNumbers.size < 10) {
      uniqueNumbers.add(Math.floor(Math.random() * 99) + 1);
    }
    this.numbers = Array.from(uniqueNumbers);
    // ordenar los 10 numeros de menor a mayor
    this.numbers.sort((a, b) => a - b);

    this.createAndResetSelectedCardValues()
  }

  public selectCard(cardNumber: number) {
    this.createAndResetSelectedCardValues()

    // actualizar valor de card seleccionada a true
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

    setTimeout(() => {
      this.gameService.changeShowPlayerElements(false)
      this.gameService.changeShowSpectatorElements(false)
      this.modalService.changeShowModal(true);
      this.router.navigate(['/game-table']);
    }, 1000);
  }

  public chargeElements(): void {
    setTimeout(() => {
      this.currentDontShowPlayerElements = false;
    }, 1000);
  }

  public changeCardBackground(): void {
    setTimeout(() => {
      this.currentChangeCardBackground = true;
      this.currentShowToastedMessage = false;
    }, 2000);
  }

  ngOnInit() {
    this.generateNumbers();

    this.gameService.currentShowPlayerElements.subscribe(showPlayerElements => {
      this.currentShowPlayerElements = showPlayerElements;
    });

    this.authService.currentUserName.subscribe(userName => {
      this.currentUserName = userName;
      this.currentUserNameInitials = userName.toUpperCase().slice(0, 2);
    });

    this.chargeElements()
  }
}
