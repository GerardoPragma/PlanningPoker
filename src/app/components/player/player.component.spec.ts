import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate fibonacci numbers', () => {
    const cardMode = 'F';
    component.generateNumbers(cardMode)

    expect(component.numbers.length).toBe(10);
    expect(component.numbers).toEqual([0, 1, 3, 5, 8, 13, 21, 34, 55, 89]);
  });

  it('should generate power numbers', () => {
    const cardMode = 'P';
    component.generateNumbers(cardMode)

    expect(component.numbers.length).toBe(10);
    expect(component.numbers).toEqual([0, 1, 4, 9, 16, 25, 36, 49, 64, 81]);
  });
  
  it('should generate random numbers for other modes', () => {
    component.generateNumbers('Aleatorio');
    expect(component.numbers.length).toBe(10);
    expect(component.numbers.every((num, i) => {
      if(i < component.numbers.length - 1) {
        return num < component.numbers[i + 1]
      } else {
        return true
      }
    } )).toBe(true);
  });

  it('should generate the variables correctly', () => {
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
    expect(component.showCardMode).toBe(true);
  });

  it('should set true to users', async () => {
    const userName = 'Albert'
    component.makeAdmin(userName);

    expect(component.userPermission[userName]).toBe(true);
  });

  it('should set true to a cardMode and reset all buttons', async () => {
    component.selectCard(10)
    const cardMode = 'F'
    component.changeCardMode(cardMode)    

    expect(component.currentShowButton).toBe(false);
    expect(component.currentShowUserCard).toBe(false);
    expect(component.currentChangeCardBackground).toBe(false);
  });
  
});
