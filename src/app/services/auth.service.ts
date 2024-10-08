import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly gameUserSource = new BehaviorSubject<string>('');
  currentUserName = this.gameUserSource.asObservable();
  
  private readonly gameUserRole = new BehaviorSubject<string>('');
  currentUserRole = this.gameUserRole.asObservable();

  changeUserName(userName: string) {
    this.gameUserSource.next(userName);
  }

  changeUserRole(userRole: string) {
    this.gameUserRole.next(userRole);
  }
  
}
