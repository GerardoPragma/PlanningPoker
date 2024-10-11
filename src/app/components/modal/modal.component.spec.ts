import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let gameService: GameService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        GameService,
        AuthService,
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the createUserForm with invalid form and required fields', () => {
    expect(component.createUserForm.valid).toBe(false);
    expect(component.createUserForm.get('nombreUsuario')).toBeTruthy();
    expect(component.createUserForm.get('seleccionRol')).toBeTruthy();
  });

  it('should be invalid if form controls are empty', () => {
    component.createUserForm.setValue({ nombreUsuario: '', seleccionRol: '' });
    expect(component.createUserForm.valid).toBeFalsy();
  });

  it('should not validate name with less than 5 characters', () => {
    const nombreUsuarioControl = component.createUserForm.get('nombreUsuario');
    if (nombreUsuarioControl) {
      nombreUsuarioControl.setValue('Pedro');
      expect(nombreUsuarioControl.hasError('minlength')).toBe(false);
    }
  });

  it('should not validate name with more than 20 characters', () => {
    const nombreUsuarioControl = component.createUserForm.get('nombreUsuario');
    if (nombreUsuarioControl) {
      nombreUsuarioControl.setValue('ThisNameIsLongEnough');
      expect(nombreUsuarioControl.hasError('maxlength')).toBe(false);
    }
  });

  it('should validate name with more than 3 numbers', () => {
    const nombreUsuarioControl = component.createUserForm.get('nombreUsuario');
    if (nombreUsuarioControl) {
      nombreUsuarioControl.setValue('Name1234');
      expect(nombreUsuarioControl.valid).toBeFalsy();
      expect(nombreUsuarioControl.errors).toEqual({ invalidName: true });
    }
  });

  it('should validate name with special characters', () => {
    const nombreUsuarioControl = component.createUserForm.get('nombreUsuario');
    if (nombreUsuarioControl) {
      nombreUsuarioControl.setValue('Name*Special');
      expect(nombreUsuarioControl.valid).toBeFalsy();
      expect(nombreUsuarioControl.errors).toEqual({ invalidName: true });
    }
  });

  it('should set the seleccionRol control to a valid value', () => {
    const nombreRolControl = component.createUserForm.get('seleccionRol');
    if (nombreRolControl) {
      nombreRolControl.setValue('jugador')
      expect(nombreRolControl.valid).toBe(true);
      nombreRolControl.setValue('espectador')
      expect(nombreRolControl.valid).toBe(true);
    }
  });

  it('should set the seleccionRol control to an invalid value', () => {
    const nombreRolControl = component.createUserForm.get('seleccionRol');
    if (nombreRolControl) {
      nombreRolControl.setValue('invalido')
      expect(nombreRolControl.valid).toBe(false);
    }
  });

  it('should set userName, userRole, espectatorElements and selectRoleElements', async () => {
    jest.spyOn(authService, 'changeUserName');
    jest.spyOn(authService, 'changeUserRole');
    jest.spyOn(gameService, 'changeShowEspectatorElements');

    const validFormData = { nombreUsuario: 'ValidName', seleccionRol: 'espectador' };
    component.createUserForm.setValue(validFormData);
    component.onSubmit();
    fixture.detectChanges();

    expect(component.visible).toBe(false)
    expect(component.createUserForm.valid).toBeTruthy();
    expect(authService.changeUserName).toHaveBeenCalledWith(validFormData.nombreUsuario);
    expect(authService.changeUserRole).toHaveBeenCalledWith(validFormData.seleccionRol);
    expect(gameService.changeShowEspectatorElements).toHaveBeenCalledWith(true);
  });

  it('should navigate to spectator', async () => {
    jest.spyOn(router, 'navigate');

    const validFormData = { nombreUsuario: 'ValidName', seleccionRol: 'espectador' };
    component.createUserForm.setValue(validFormData);
    component.onSubmit();
    fixture.detectChanges();

    expect(component.createUserForm.valid).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith(['/spectator']);
  });

  it('should navigate to spectator', async () => {
    jest.spyOn(router, 'navigate');

    const validFormData = { nombreUsuario: 'ValidName', seleccionRol: 'jugador' };
    component.createUserForm.setValue(validFormData);
    component.onSubmit();
    fixture.detectChanges();

    expect(component.createUserForm.valid).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith(['/player']);
  });

});
