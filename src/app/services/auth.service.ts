import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private gameUserSource = new BehaviorSubject<string>('');
  private gameUserRole = new BehaviorSubject<string>('');
  currentUserName = this.gameUserSource.asObservable();
  currentUserRole = this.gameUserRole.asObservable();

  changeUserName(userName: string) {
    this.gameUserSource.next(userName);
  }
  getUserName() {
    return this.currentUserName;
  }

  changeUserRole(userRole: string) {
    this.gameUserRole.next(userRole);
  }
  getUserRole() {
    return this.currentUserRole;
  }
  
}
