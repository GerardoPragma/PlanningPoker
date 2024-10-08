import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GameService } from '../../services/game.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.css'
})
export class CreateGameComponent {
  createGameForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder, 
    private readonly router: Router, 
    private readonly gameService: GameService,
    private readonly modalService: ModalService
  ) {
    this.createGameForm = this.fb.group({
      nombrePartida: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), this.customValidators.nameValidator]]
    });
  }

  customValidators = {
    nameValidator: (control: any) => {
      const name = control.value;
      const regex = /^[a-zA-Z0-9\s]{5,20}$/; // Expresión regular para validar el nombre
      const numberCount = (name.match(/\d/g) || []).length; // Contar la cantidad de números

      return regex.test(name) && numberCount <= 3 ? null : { invalidName: true };
    }
  };

  onSubmit() {
    this.gameService.changeGameName(this.createGameForm.value.nombrePartida);
    this.gameService.changeShowCrearPartida(false);
    this.router.navigate(['/game-table']);
    this.modalService.changeShowModal(true);
  }
}
