import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './counter.effects';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('Counter', counterReducer),
    EffectsModule.forFeature([CounterEffects])
  ]
})
export class CounterModule { }
