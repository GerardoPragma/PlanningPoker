import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private showModal = new BehaviorSubject<boolean>(false);
  currentShowModal = this.showModal.asObservable();

  changeShowModal(showModal: boolean) {
    this.showModal.next(showModal);
  }
}
