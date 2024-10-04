import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  private gameNameSource = new BehaviorSubject<string>('');
  currentGameName = this.gameNameSource.asObservable();

  private showEspectatorElements = new BehaviorSubject<boolean>(false);
  currentEspectatorElements = this.showEspectatorElements.asObservable();

  private showCrearPartida = new BehaviorSubject<boolean>(true);
  currentShowCrearPartida = this.showCrearPartida.asObservable();

  private showSelectRoleElements = new BehaviorSubject<boolean>(true);
  currentShowSelectRoleElements = this.showSelectRoleElements.asObservable();

  changeGameName(gameName: string) {
    this.gameNameSource.next(gameName);
  }
  
  changeShowEspectatorElements(showEspectatorElements: boolean) {
    this.showEspectatorElements.next(showEspectatorElements);
  }

  changeShowCrearPartida(showCrearPartida: boolean) {
    this.showCrearPartida.next(showCrearPartida);
  }

  changeShowSelectRoleElements(showEspectatorCard: boolean) {
    this.showSelectRoleElements.next(showEspectatorCard);
  }
}