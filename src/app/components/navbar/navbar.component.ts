import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  currentGameName: string = '';
  currentUserName: string = '';
  currentUserRole: string = '';
  showGameName: boolean = false;

  constructor(private gameService: GameService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUserName.subscribe(userName => {
      this.currentUserName = userName;
    });
    this.authService.currentUserRole.subscribe(userRole => {
      this.currentUserRole = userRole;
    });
    this.gameService.currentShowName.subscribe(showName => {
      this.showGameName = showName;
    })
    this.gameService.currentGameName.subscribe(gameName => {
      this.currentGameName = gameName;
    })
  }
}