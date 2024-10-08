import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  currentShowLogoAndCrearPartida: boolean = false;
  currentShowCrearPartida: boolean = true;
  currentGameName: string = '';
  currentUserName: string = '';
  currentUserNameInitials: string = '';
  currentUserRole: string = '';
  currentShowEspectatorElements: boolean = false;

  constructor(
    private readonly gameService: GameService, 
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.gameService.currentShowLogoAndCrearPartida.subscribe(showLogoAndCrearPartida => {
      this.currentShowLogoAndCrearPartida = showLogoAndCrearPartida;
    });
    this.gameService.currentShowCrearPartida.subscribe(showCrearPartida => {
      this.currentShowCrearPartida = showCrearPartida;
    });
    this.gameService.currentGameName.subscribe(gameName => {
      this.currentGameName = gameName;
    });
    this.authService.currentUserName.subscribe(userName => {
      this.currentUserName = userName;
      this.currentUserNameInitials = userName.toUpperCase().slice(0, 2);
    });
    this.authService.currentUserRole.subscribe(userRole => {
      this.currentUserRole = userRole;
    });
    this.gameService.currentEspectatorElements.subscribe(showEspectatorElements => {
      this.currentShowEspectatorElements = showEspectatorElements;
    });
  }
}