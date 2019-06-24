import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactComponent} from './contact.component';
import {MockMeComponent} from './components/mock-me/mock-me.component';
import {FormsModule} from '@angular/forms';
import {WithContentComponent} from './components/with-content/with-content.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ContactComponent, MockMeComponent, WithContentComponent],
  exports: [ContactComponent],
})
export class ContactModule {
}
