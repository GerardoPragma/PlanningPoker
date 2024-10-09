import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  private readonly showLogoAndCrearPartida = new BehaviorSubject<boolean>(false);
  currentShowLogoAndCrearPartida = this.showLogoAndCrearPartida.asObservable();

  private readonly showCrearPartida = new BehaviorSubject<boolean>(true);
  currentShowCrearPartida = this.showCrearPartida.asObservable();

  private readonly gameNameSource = new BehaviorSubject<string>('');
  currentGameName = this.gameNameSource.asObservable();

  private readonly showEspectatorElements = new BehaviorSubject<boolean>(false);
  currentEspectatorElements = this.showEspectatorElements.asObservable();

  private readonly showSelectRoleElements = new BehaviorSubject<boolean>(true);
  currentShowSelectRoleElements = this.showSelectRoleElements.asObservable();

  changeShowLogoAndCrearPartida(showLogoAndCrearPartida: boolean) {
    this.showLogoAndCrearPartida.next(showLogoAndCrearPartida);
  }

  changeShowCrearPartida(showCrearPartida: boolean) {
    this.showCrearPartida.next(showCrearPartida);
  }

  changeGameName(gameName: string) {
    this.gameNameSource.next(gameName);
  }
  
  changeShowEspectatorElements(showEspectatorElements: boolean) {
    this.showEspectatorElements.next(showEspectatorElements);
  }

  changeShowSelectRoleElements(showSelectRoleElements: boolean) {
    this.showSelectRoleElements.next(showSelectRoleElements);
  }
}