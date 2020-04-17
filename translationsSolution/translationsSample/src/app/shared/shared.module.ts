import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from './tile/tile.component';
import { XTranslatePipe } from 'src/translations/xtr.pipe';



@NgModule({
  declarations: [
    TileComponent,
    XTranslatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TileComponent,
    XTranslatePipe
  ]
})
export class SharedModule { }
