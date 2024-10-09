import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private readonly showModal = new BehaviorSubject<boolean>(false);
  currentShowModal = this.showModal.asObservable();

  private readonly showModalInvitarJugadores = new BehaviorSubject<boolean>(false);
  currentShowModalInvitarJugadores = this.showModalInvitarJugadores.asObservable();

  changeShowModal(showModal: boolean) {
    this.showModal.next(showModal);
  }

  changeShowModalInvitarJugadores(showModalInvitarJugadores: boolean) {
    this.showModalInvitarJugadores.next(showModalInvitarJugadores);
  }
}
