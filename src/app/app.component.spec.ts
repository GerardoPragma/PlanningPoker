import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarModule } from './components/navbar/navbar.module';
import { CreateGameComponent } from './components/create-game/create-game.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

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

  it('should navigate on takeOffLoadingPage', async () => {
    jest.spyOn(router, 'navigate');

    component.takeOffLoadingPage();
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(router.navigate).toHaveBeenCalledWith(['/create-game']);
  });

});
