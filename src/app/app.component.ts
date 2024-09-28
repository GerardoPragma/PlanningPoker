import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PlanningPoker';
  isLoading = true;

  constructor(private router: Router) {}

  // Simular una carga de 2 segundos
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/create-game']);
    }, 2000);
  }
}
