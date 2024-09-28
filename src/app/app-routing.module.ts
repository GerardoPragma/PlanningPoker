import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';

const routes: Routes = [
  { path: '', component: LoadingPageComponent },
  { path: 'create-game', component: CreateGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
