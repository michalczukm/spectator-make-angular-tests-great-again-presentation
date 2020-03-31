import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TshirtItemComponent } from './tshirt-item.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TshirtItemComponentTestBed', () => {
  let component: TshirtItemComponent;
  let fixture: ComponentFixture<TshirtItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TshirtItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TshirtItemComponent);
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
      component.buyClicked.subscribe((actualEvent) => {
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

  /**
   * This won't work :(
   * Why? Change was not done via REAL input - so CD won't check it.
   * What we can do with it? Create testing component!
   */
  xdescribe('disable buy', () => {
    it('should disable buy if configured', async () => {
      fixture.componentInstance.buyDisabled = true;
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      expect(fixture.debugElement.query(By.css('button'))).toBeNull();
    });
  });
});
