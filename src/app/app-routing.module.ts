import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { CognitoComponent } from './components/cognito/cognito.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { GameTableComponent } from './components/game-table/game-table.component';
import { SpectatorComponent } from './components/spectator/spectator.component';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
  { path: '', component: LoadingPageComponent },
  { path: 'authentication', component: CognitoComponent },
  { path: 'login', component: CognitoComponent },
  { path: 'create-game', component: CreateGameComponent },
  { path: 'game-table', component: GameTableComponent },
  { path: 'spectator', component: SpectatorComponent },
  { path: 'player', component: PlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
