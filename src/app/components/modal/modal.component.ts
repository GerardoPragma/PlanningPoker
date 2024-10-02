import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  createUserForm: FormGroup;
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private authService: AuthService, private gameService: GameService) {
    this.createUserForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), this.customValidators.nameValidator]],
      seleccionRol: ['', [Validators.required, this.customValidators.rolValidator]]
    });
  }

  customValidators = {
    nameValidator: (control: any) => {
      const name = control.value;
      const regex = /^[a-zA-Z0-9\s]{5,20}$/; // Expresión regular para validar el nombre
      const numberCount = (name.match(/\d/g) || []).length; // Contar la cantidad de números

      return regex.test(name) && numberCount <= 3 ? null : { invalidName: true };
    },
    rolValidator: (control: any) => {
      const allowedRules = ['jugador', 'espectador'];
      return allowedRules.includes(control.value) ? null : { invalidRol: true };
    }
  };

  ngOnInit(): void {}

  onSubmit() {
    //console.log('Nombre de usuario:', this.createUserForm.value.nombreUsuario);
    //console.log('Rol de usuario:', this.createUserForm.value.seleccionRol);
    this.authService.changeUserName(this.createUserForm.value.nombreUsuario);
    this.authService.changeUserRole(this.createUserForm.value.seleccionRol);
    this.gameService.changeShowName(true);
    this.visible = false
  }
}
