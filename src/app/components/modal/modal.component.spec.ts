import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { AuthService } from '../../services/auth.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
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

  it('should call a method after submitting the form', () => {
    const spy = jest.spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

});
