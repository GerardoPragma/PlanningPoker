import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router'; 

import { ModalService } from '../../services/modal.service';
import { GameService } from '../../services/game.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let modalService: ModalService;
  let gameService: GameService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        ModalService,
        GameService,
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
    gameService = TestBed.inject(GameService);
    router = TestBed.inject(Router);
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

  it('should correctly set the services afterl call changeVisualizationMode', () => {
    jest.spyOn(gameService, 'changeShowPlayerElements');
    jest.spyOn(gameService, 'changeShowSpectatorElements');
    jest.spyOn(modalService, 'changeShowModal');
    jest.spyOn(router, 'navigate');

    component.changeVisualizationMode();
    fixture.detectChanges();

    expect(gameService.changeShowPlayerElements).toHaveBeenCalledWith(false);
    expect(gameService.changeShowSpectatorElements).toHaveBeenCalledWith(false);
    expect(modalService.changeShowModal).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith(['/game-table']);
  });

});
