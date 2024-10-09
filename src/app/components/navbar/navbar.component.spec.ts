import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { ModalService } from '../../services/modal.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        ModalService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set true to currentShowModalInvitarJugadores after call openModal', async () => {
    expect(component.currentShowModalInvitarJugadores).toBe(false);

    jest.spyOn(modalService, 'changeShowModalInvitarJugadores');

    component.openModal();
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(modalService.changeShowModalInvitarJugadores).toHaveBeenCalledWith(true);
  });

  it('should set false to currentShowModalInvitarJugadores after call closeModal', async () => {
    component.currentShowModalInvitarJugadores = true

    jest.spyOn(modalService, 'changeShowModalInvitarJugadores');

    component.closeModal();
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(modalService.changeShowModalInvitarJugadores).toHaveBeenCalledWith(false);
  });

});
