import { ComponentFixture, flush, TestBed } from '@angular/core/testing';
import { PlayerComponent } from './player.component';
import { GameService } from '../../services/game.service';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router'; 

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let gameService: GameService;
  let modalService: ModalService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent],
      providers: [
        GameService,
        ModalService,
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerComponent);
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
    const cardNumber = component.numbers[0];
    component.selectCard(cardNumber);

    expect(component.numbers.length).toBe(10);
    expect(component.selectedNumbers.length).toBe(7);
    expect(component.selectedNumbers.every(num => component.numbers.includes(num))).toBeTruthy();
    expect(component.average).toBeGreaterThanOrEqual(0);
    expect(component.average).toBeLessThanOrEqual(99);
    expect(component.uniqueNumbersLength).toBeGreaterThanOrEqual(1);
  });

  it('should set selectedCardQuestion to true', () => {
    const cardNumber = -10;
    component.selectCard(cardNumber);
    expect(component.selectedCardQuestion).toBe(true)
  });

  it('should set selectedCardQuestion to false', () => {
    const cardNumber = 10;
    component.selectCard(cardNumber);
    expect(component.selectedCardQuestion).toBe(false)
  });

  it('should handle element changes correctly', async () => {
    component.chargeElements();
    component.changeCardBackground();

    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(component.currentDontShowPlayerElements).toBe(false);
    expect(component.currentChangeCardBackground).toBe(true);
  });

  it('should set correct values after call showCardsAndAverage', async () => {
    component.showCardsAndAverage();

    expect(component.currentShowButton).toBe(false);
    expect(component.currentGenerateNumbers).toBe(true);

    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve, 2000));

    expect(component.currentShowUserCard).toBe(false);
    expect(component.currentShowPlayerElements).toBe(false);
    expect(component.currentGenerateNumbers).toBe(false);
    expect(component.currentChangeCardBackground).toBe(false);
    expect(component.currentShowSelectedNumbers).toBe(true);
  });

  it('should call the necessary services and navigate on nuevaVotacion', async () => {
    component.nuevaVotacion();

    expect(component.currentShowSelectedNumbers).toBe(false);
    expect(component.currentShowPlayerElements).toBe(true);

    jest.spyOn(gameService, 'changeShowPlayerElements');
    jest.spyOn(modalService, 'changeShowModal');
    jest.spyOn(router, 'navigate');

    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(gameService.changeShowPlayerElements).toHaveBeenCalledWith(false);
    expect(modalService.changeShowModal).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith(['/game-table']);
  });
  
});
