import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ContactComponent } from './contact.component';
import { By } from '@angular/platform-browser';
import { MockMeComponent } from './components/mock-me/mock-me.component';
import { WithContentComponent } from './components/with-content/with-content.component';

describe('ContactComponentTestBed', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactComponent,
        MockMeMockComponent,
        WithContentComponent,
      ],
      imports: [ToastrModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('communication with mocked component', () => {
    it('should display toastr', () => {
      const toastrService: ToastrService = TestBed.get<ToastrService>(
        ToastrService
      );
      spyOn(toastrService, 'info');

      const mockMeComponent: MockMeComponent = fixture.debugElement.query(
        By.css('app-mock-me')
      ).componentInstance;

      mockMeComponent.hitted.emit(10);

      expect(toastrService.info).toHaveBeenCalledWith('Text hitted 10 times!');
    });
  });
});

@Component({
  selector: 'app-mock-me',
  template: ``,
})
export class MockMeMockComponent {
  @Output() hitted: EventEmitter<number> = new EventEmitter<number>();
}
