import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  private gameNameSource = new BehaviorSubject<string>('');
  currentGameName = this.gameNameSource.asObservable();
  private showGameName = new BehaviorSubject<boolean>(false);
  currentShowName = this.showGameName.asObservable();

  changeGameName(gameName: string) {
    this.gameNameSource.next(gameName);
  }
  
  changeShowName(showName: boolean) {
    this.showGameName.next(showName);
  }
}