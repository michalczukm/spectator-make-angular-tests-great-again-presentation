import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TshirtItemComponent } from './tshirt-item.component';
import { By } from '@angular/platform-browser';
import { DebugElement, Input, Output, ViewChild } from '@angular/core';

describe('TshirtItemComponentWithTestComponent', () => {
  let component: TshirtItemTestComponent;
  let fixture: ComponentFixture<TshirtItemTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TshirtItemTestComponent, TshirtItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TshirtItemTestComponent);
    component = fixture.componentInstance;
    component.item = {
      imageUrl: 'https://example.com/image.png',
      name: 'some tshirt',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('basic display', () => {
    it('should display img', () => {
      const image: DebugElement = fixture.debugElement.query(By.css('img'));

      // tslint:disable-next-line:no-string-literal
      expect(image.properties['src']).toBe('https://example.com/image.png');
    });

    it('should display item name', () => {
      const nameElement: DebugElement = fixture.debugElement.query(
        By.css('h4')
      );

      expect(nameElement.nativeElement.innerHTML).toBe('some tshirt');
    });
  });

  describe('buy item', () => {
    it('should emit buy item event on click', () => {
      component.tested.buyClicked.subscribe((actualEvent) => {
        expect(actualEvent).toEqual({
          imageUrl: 'https://example.com/image.png',
          name: 'some tshirt',
        });
      });

      fixture.debugElement
        .query(By.css('button'))
        .triggerEventHandler('click', {});
    });
  });

  describe('disable buy', () => {
    it('should disable buy if configured', () => {
      fixture.componentInstance.buyDisabled = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button'))).toBeNull();
    });
  });
});

import { Component } from '@angular/core';
import { Tshirt } from '../../shared';
import createSpy = jasmine.createSpy;

@Component({
  template: ` <app-tshirt-item
    [item]="item"
    [buyDisabled]="buyDisabled"
    (buyClicked)="(buyClicked)"
  >
  </app-tshirt-item>`,
})
export class TshirtItemTestComponent {
  @Input() item: Tshirt;
  @Input() buyDisabled: boolean;

  @Output() buyClicked: (item: Tshirt) => void = createSpy(
    'buyClicked'
  ).and.stub();

  @ViewChild(TshirtItemComponent, { static: true }) tested: TshirtItemComponent;
}
