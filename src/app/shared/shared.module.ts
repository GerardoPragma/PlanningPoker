import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ModalComponent]
})
export class SharedModule { }