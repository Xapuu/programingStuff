import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyModuleRoutingModule } from './lazy-module-routing.module';
import { ContainerComponent } from './container/container.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule,
    LazyModuleRoutingModule,
    SharedModule
  ]
})
export class LazyModuleModule { }
