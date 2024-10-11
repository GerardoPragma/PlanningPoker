import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';

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
  currentShowSpectatorElements: boolean = false;
  currentShowPlayerElements: boolean = false;
  currentShowModalInvitarJugadores: boolean = false;

  constructor(
    private readonly gameService: GameService, 
    private readonly authService: AuthService,
    private readonly modalService: ModalService,
    private readonly router: Router
  ) {}

  openModal() {
    this.modalService.changeShowModalInvitarJugadores(true);
  }

  closeModal() {
    this.modalService.changeShowModalInvitarJugadores(false);
  }

  changeVisualizationMode() {
    this.gameService.changeShowPlayerElements(false)
    this.gameService.changeShowSpectatorElements(false)
    this.modalService.changeShowModal(true);
    this.router.navigate(['/game-table']);
  }

  async copiarLink() {
    try {
      await navigator.clipboard.writeText('https://tu-link-a-copiar.com');
      console.log('Link copiado al portapapeles');
    } catch (error) {
      console.error('Error al copiar el link');
    }
  }

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
    this.gameService.currentShowSpectatorElements.subscribe(showSpectatorElements => {
      this.currentShowSpectatorElements = showSpectatorElements;
    });
    this.gameService.currentShowPlayerElements.subscribe(showPlayerElements => {
      this.currentShowPlayerElements = showPlayerElements;
    });
    this.modalService.currentShowModalInvitarJugadores.subscribe(showModalInvitarJugadores => {
      this.currentShowModalInvitarJugadores = showModalInvitarJugadores;
    });
  }
}