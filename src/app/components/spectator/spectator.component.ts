import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private readonly gameService: GameService, 
    private readonly authService: AuthService, 
    private readonly modalService: ModalService,
    private readonly router: Router
  ) {}

  public generateNumbers(): void {
    this.currentShowButton = false;
    this.currentGenerateNumbers = true;

    // 10 numeros aleatorios diferentes (no se pueden repetir)
    const uniqueNumbers = new Set<number>();
    while (uniqueNumbers.size < 10) {
      uniqueNumbers.add(Math.floor(Math.random() * 99) + 1);
    }
    this.numbers = Array.from(uniqueNumbers);

    // 7 números aleatorios de los 10 generados (se pueden repetir)
    this.selectedNumbers = [];
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * 10);
      this.selectedNumbers.push(this.numbers[randomIndex]);
    }

    // promedio de los 7 numeros aleatorios
    this.average = this.selectedNumbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this.selectedNumbers.length;

    // contar numeros repetidos de los 7 numeros aleatorios
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
    this.currentShowSelectedNumbers = false;
    setTimeout(() => {
      this.gameService.changeShowPlayerElements(false)
      this.gameService.changeShowSpectatorElements(false)
      this.modalService.changeShowModal(true);
      this.router.navigate(['/game-table']);
    }, 1000);
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

  public generateUsers(): void {
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

  public makeAdmin(user: string): void {
    this.userPermission[user] = true;
  }

  ngOnInit() {
    this.gameService.currentShowSpectatorElements.subscribe(showSpectatorElements => {
      this.currentShowSpectatorElements = showSpectatorElements;
    });

    this.authService.currentUserName.subscribe(userName => {
      this.currentUserName = userName;
      this.currentUserNameInitials = userName.toUpperCase().slice(0, 2);
    });

    this.chargeElements()
    this.changeCardBackground()
  }

}
