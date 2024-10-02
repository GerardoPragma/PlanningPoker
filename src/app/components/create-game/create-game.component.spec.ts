import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGameComponent } from './create-game.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateGameComponent', () => {
  let component: CreateGameComponent;
  let fixture: ComponentFixture<CreateGameComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGameComponent],
      imports: [ ReactiveFormsModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the createUserForm with invalid form and required fields', () => {
    expect(component.createGameForm.valid).toBe(false);
    expect(component.createGameForm.get('nombrePartida')).toBeTruthy();
  });

  it('should be invalid if form controls are empty', () => {
    component.createGameForm.setValue({ nombrePartida: '' });
    expect(component.createGameForm.valid).toBeFalsy();
  });

  it('should not validate name with less than 5 characters', () => {
    const nombrePartidaControl = component.createGameForm.get('nombrePartida');
    if (nombrePartidaControl) {
      nombrePartidaControl.setValue('Short');
      expect(nombrePartidaControl.hasError('minlength')).toBe(false);
    }
  });

  it('should not validate name with more than 20 characters', () => {
    const nombrePartidaControl = component.createGameForm.get('nombrePartida');
    if (nombrePartidaControl) {
      nombrePartidaControl.setValue('ThisNameIsLongEnough');
      expect(nombrePartidaControl.hasError('maxlength')).toBe(false);
    }
  });

  it('should validate name with more than 3 numbers', () => {
    const nombrePartidaControl = component.createGameForm.get('nombrePartida');
    if (nombrePartidaControl) {
      nombrePartidaControl.setValue('Name1234');
      expect(nombrePartidaControl.valid).toBeFalsy();
      expect(nombrePartidaControl.errors).toEqual({ invalidName: true });
    }
  });

  it('should validate name with special characters', () => {
    const nombrePartidaControl = component.createGameForm.get('nombrePartida');
    if (nombrePartidaControl) {
      nombrePartidaControl.setValue('Name*Special');
      expect(nombrePartidaControl.valid).toBeFalsy();
      expect(nombrePartidaControl.errors).toEqual({ invalidName: true });
    }
  });

  it('should call a method after submitting the form', () => {
    const spy = jest.spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

});
