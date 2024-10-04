import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { GameTableComponent } from './components/game-table/game-table.component';
import { SpectatorComponent } from './components/spectator/spectator.component';

const routes: Routes = [
  { path: '', component: LoadingPageComponent },
  { path: 'create-game', component: CreateGameComponent },
  { path: 'game-table', component: GameTableComponent },
  { path: 'spectator', component: SpectatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
