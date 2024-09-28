import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { SpectatorComponent } from './components/spectator/spectator.component';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GameTableComponent } from './components/game-table/game-table.component';
import { VoteComponent } from './components/vote/vote.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingPageComponent,
    CreateGameComponent,
    SelectRoleComponent,
    SpectatorComponent,
    PlayerComponent,
    NavbarComponent,
    GameTableComponent,
    VoteComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
