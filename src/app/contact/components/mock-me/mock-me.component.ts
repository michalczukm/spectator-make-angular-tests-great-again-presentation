import {Component, EventEmitter, HostListener, Output} from '@angular/core';

@Component({
  selector: 'app-mock-me',
  templateUrl: './mock-me.component.html',
  styleUrls: ['./mock-me.component.css']
})
export class MockMeComponent {
  @Output() hitted: EventEmitter<number> = new EventEmitter<number>();

  applySomeStyle = false;
  inputData: string;

  private hitCounter = 0;

  @HostListener('click')
  onClick(): void {
    this.hitted.emit(++this.hitCounter);
  }

  setStyle() {
    this.applySomeStyle = !this.applySomeStyle;
  }
}
