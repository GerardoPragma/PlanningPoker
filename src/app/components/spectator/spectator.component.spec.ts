import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpectatorComponent } from './spectator.component';

describe('SpectatorComponent', () => {
  let component: SpectatorComponent;
  let fixture: ComponentFixture<SpectatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpectatorComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpectatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate fibonacci numbers', () => {
    const cardMode = 'F';
    component.changeCardMode(cardMode)

    expect(component.numbers.length).toBe(10);
    expect(component.numbers).toEqual([0, 1, 3, 5, 8, 13, 21, 34, 55, 89]);
  });

  it('should generate power numbers', () => {
    const cardMode = 'P';
    component.changeCardMode(cardMode)

    expect(component.numbers.length).toBe(10);
    expect(component.numbers).toEqual([0, 1, 4, 9, 16, 25, 36, 49, 64, 81]);
  });
  
  it('should generate random numbers for other modes', () => {
    component.changeCardMode('Aleatorio');
    expect(component.numbers.length).toBe(10);
    expect(component.numbers.every((num, i) => {
      if(i < component.numbers.length - 1) {
        return num < component.numbers[i + 1]
      } else {
        return true
      }
    } )).toBe(true);
  });

  it('should change styles after calling changeCardMode', async () => {
    component.changeCardBackground()

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    component.changeCardMode('Aleatorio')
    expect(component.currentShowButton).toBe(false)
    expect(component.currentChangeCardBackground).toBe(false)

    await new Promise(resolve => setTimeout(resolve, 2000));

    expect(component.currentShowButton).toBe(true)
    expect(component.currentChangeCardBackground).toBe(true)
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

  it('should call the necessary services and navigate on nuevaVotacion', () => {
    component.nuevaVotacion();
    expect(component.currentShowSelectedNumbers).toBe(false);
  });

  it('should set true to users', async () => {
    const userName = 'Albert'
    component.makeAdmin(userName);

    expect(component.userPermission[userName]).toBe(true);
  });

});
