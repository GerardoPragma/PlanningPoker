// app.state.module.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers, initialState } from './app.state';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { initialState }),
  ]
})
export class AppStateModule { }