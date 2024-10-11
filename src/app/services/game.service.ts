import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  // Create game Component
  private readonly gameNameSource = new BehaviorSubject<string>('');
  currentGameName = this.gameNameSource.asObservable();
  changeGameName(gameName: string) {
    this.gameNameSource.next(gameName);
  }

  // Spectator Component
  private readonly showLogoAndCrearPartida = new BehaviorSubject<boolean>(false);
  currentShowLogoAndCrearPartida = this.showLogoAndCrearPartida.asObservable();
  changeShowLogoAndCrearPartida(showLogoAndCrearPartida: boolean) {
    this.showLogoAndCrearPartida.next(showLogoAndCrearPartida);
  }

  private readonly showCrearPartida = new BehaviorSubject<boolean>(true);
  currentShowCrearPartida = this.showCrearPartida.asObservable();
  changeShowCrearPartida(showCrearPartida: boolean) {
    this.showCrearPartida.next(showCrearPartida);
  }

  private readonly showSpectatorElements = new BehaviorSubject<boolean>(false);
  currentShowSpectatorElements = this.showSpectatorElements.asObservable();
  changeShowSpectatorElements(showSpectatorElements: boolean) {
    this.showSpectatorElements.next(showSpectatorElements);
  }

  // Player Component
  private readonly showPlayerElements = new BehaviorSubject<boolean>(false);
  currentShowPlayerElements = this.showPlayerElements.asObservable();

  changeShowPlayerElements(showPlayerElements: boolean) {
    this.showPlayerElements.next(showPlayerElements);
  }

  
}