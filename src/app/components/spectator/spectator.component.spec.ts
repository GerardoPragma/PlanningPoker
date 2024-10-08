import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpectatorComponent } from './spectator.component';
import { GameService } from '../../services/game.service';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router'; 

describe('SpectatorComponent', () => {
  let component: SpectatorComponent;
  let fixture: ComponentFixture<SpectatorComponent>;
  let gameService: GameService;
  let modalService: ModalService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpectatorComponent],
      providers: [
        GameService,
        ModalService,
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpectatorComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    modalService = TestBed.inject(ModalService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate numbers correctly', () => {
       component.generateNumbers();
   
       expect(component.numbers.length).toBe(10);
       expect(component.selectedNumbers.length).toBe(7);
       expect(component.selectedNumbers.every(num => component.numbers.includes(num))).toBeTruthy();
       expect(component.average).toBeGreaterThanOrEqual(0);
       expect(component.average).toBeLessThanOrEqual(99);
       expect(component.uniqueNumbersLength).toBeGreaterThanOrEqual(1);
  });

  it('should handle element changes correctly', async () => {
    component.chargeElements();
    component.changeCardBackground();

    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(component.currentDontShowSpectatorElements).toBe(false);
    expect(component.currentChangeCardBackground).toBe(true);
    expect(component.currentShowButton).toBe(true);
  });

  it('should call the necessary services and navigate on nuevaVotacion', async () => {
    expect(component.currentShowSelectedNumbers).toBe(false);

    jest.spyOn(gameService, 'changeShowEspectatorElements');
    jest.spyOn(gameService, 'changeShowSelectRoleElements');
    jest.spyOn(modalService, 'changeShowModal');
    jest.spyOn(router, 'navigate');

    component.nuevaVotacion();
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(gameService.changeShowEspectatorElements).toHaveBeenCalledWith(false);
    expect(gameService.changeShowSelectRoleElements).toHaveBeenCalledWith(true);
    expect(modalService.changeShowModal).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith(['/game-table']);
  });

});
