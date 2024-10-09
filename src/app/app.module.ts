import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { SpectatorComponent } from './components/spectator/spectator.component';
import { PlayerComponent } from './components/player/player.component';
import { GameTableComponent } from './components/game-table/game-table.component';

import { NavbarModule } from './components/navbar/navbar.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingPageComponent,
    CreateGameComponent,
    SpectatorComponent,
    PlayerComponent,
    GameTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }