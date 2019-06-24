import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TshirtsComponent } from './tshirts.component';
import { TshirtItemComponent } from './components/tshirt-item/tshirt-item.component';

@NgModule({
  declarations: [TshirtsComponent, TshirtItemComponent],
  imports: [CommonModule],
  exports: [TshirtsComponent]
})
export class TshirtsModule {
}
