import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateGameComponent } from './components/create-game/create-game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PlanningPoker';
  modalVisible: boolean = false;

  constructor(private router: Router) {}

  public takeOffLoadingPage(): void {
    setTimeout(() => {
      this.router.navigate(['/create-game']);
    }, 2000);
  }

  ngOnInit() {
    this.takeOffLoadingPage();
  }

  onActivate(component: any) {
    if (component instanceof CreateGameComponent) {      
      component.abrirModal.subscribe(() => {
        console.log('AYUDAAAAAAAAAAAAAAAAAAAAAAA')
        this.modalVisible = true;
      });
    }
  }
}
