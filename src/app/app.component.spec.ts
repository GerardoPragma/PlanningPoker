import { TestBed, ComponentFixture, tick } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NavbarModule } from './components/navbar/navbar.module';
import { CreateGameComponent } from './components/create-game/create-game.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fixture2: ComponentFixture<CreateGameComponent>;
  let router: Router;
  let createGameComponent: CreateGameComponent;
  let abrirModalSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        NavbarModule,
        SharedModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AppComponent,
        CreateGameComponent,
      ],
      providers: [
        CreateGameComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();

    fixture2 = TestBed.createComponent(CreateGameComponent);
    createGameComponent = fixture2.componentInstance;
    abrirModalSpy = jest.spyOn(createGameComponent, 'onSubmit');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PlanningPoker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PlanningPoker');
  });

  it('should set isLoading to false and navigate to create-game route after 2 seconds', async () => {
    fixture.ngZone?.run(async () => {
      const navigateSpy = jest.spyOn(router, 'navigate');
      component.ngOnInit();
  
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      fixture.detectChanges();
      expect(navigateSpy).toHaveBeenCalledWith(['/create-game']);
    });
  });

  it('should call abrirModal on CreateGameComponent and set modalVisible to true', async () => {
    fixture.ngZone?.run(async () => {
      const mockCallback = jest.fn();
      jest.spyOn(createGameComponent.abrirModal, 'subscribe').mockImplementationOnce(mockCallback);
    
      component.onActivate(createGameComponent);
      fixture.detectChanges();
    
      expect(mockCallback).toHaveBeenCalled();
    
      mockCallback();
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      fixture.detectChanges();
      expect(component.modalVisible).toBe(true);
    });
  });

});
