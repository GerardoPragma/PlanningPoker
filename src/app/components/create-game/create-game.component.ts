import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.css'
})
export class CreateGameComponent implements OnInit {
  createGameForm: FormGroup;
  @Output() abrirModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private router: Router, private gameService: GameService) {
    this.createGameForm = this.fb.group({
      nombrePartida: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), this.customValidators.nameValidator]]
    });
  }

  // Validador personalizado para el nombre de la partida
  customValidators = {
    nameValidator: (control: any) => {
      const name = control.value;
      const regex = /^[a-zA-Z0-9\s]{5,20}$/; // Expresión regular para validar el nombre
      const numberCount = (name.match(/\d/g) || []).length; // Contar la cantidad de números

      return regex.test(name) && numberCount <= 3 ? null : { invalidName: true };
    }
  };

  ngOnInit(): void {
  }

  onSubmit() {
    //console.log('Nombre de la partida:', this.createGameForm.value.nombrePartida);
    this.gameService.changeGameName(this.createGameForm.value.nombrePartida);
    this.router.navigate(['/game-table']);
    this.abrirModal.emit();
  }
}
