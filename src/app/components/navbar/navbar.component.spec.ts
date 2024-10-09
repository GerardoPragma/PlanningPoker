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

    // Mock navigator.clipboard
    (navigator as unknown as { clipboard: { writeText: () => void }}).clipboard = {
      writeText: jest.fn().mockResolvedValue(undefined)
    };

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

  it('should copy the link to the clipboard', async () => {    
    const expectedLink = 'https://tu-link-a-copiar.com';
    const writeSpy = jest.spyOn(navigator.clipboard, "writeText");
    const logSpy = jest.spyOn(console, "log");
  
    await component.copiarLink();
  
    expect(writeSpy).toHaveBeenCalledWith(expectedLink);
    expect(logSpy).toHaveBeenCalledWith('Link copiado al portapapeles');
  });

  it('should handle errors when copying to clipboard', async () => {
    jest.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error());
    const logSpy = jest.spyOn(console, "error");
  
    await component.copiarLink();
  
    expect(logSpy).toHaveBeenCalledWith('Error al copiar el link');
  });
});
