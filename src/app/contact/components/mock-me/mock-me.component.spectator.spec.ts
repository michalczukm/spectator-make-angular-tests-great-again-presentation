import {createTestComponentFactory, Spectator} from '@netbasal/spectator';
import {MockComponents} from 'ng-mocks';
import {MockMeComponent} from './mock-me.component';
import {FormsModule} from '@angular/forms';

describe('MockMeComponent', () => {
  let spectator: Spectator<MockMeComponent>;
  const createComponent: (
    componentParameters?: Partial<MockMeComponent>,
    detectChanges?: boolean
  ) => Spectator<MockMeComponent> = createTestComponentFactory({
    component: MockMeComponent,
    declarations: MockComponents(),
    imports: [FormsModule]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('input', () => {
    it('should have empty value if not set', () => {
      expect('input').toBeEmpty();
    });

    it('should have value', () => {
      spectator.typeInElement('I wrote this!', 'input');

      spectator.detectChanges();

      expect('input').toHaveValue('I wrote this!');
    });

    it('should show typed value', () => {
      spectator.typeInElement('some value', 'input');

      expect('.display-input').toHaveText('inputData: some value');
    });

    it('should show typed value - somehow', () => {
      spectator.typeInElement('some veryloongstrange value', 'input');

      expect('.display-input').toHaveText(text => text.includes('veryloongstrange'));
    });

    it('should show typed value somewhere in container', () => {
      spectator.typeInElement('some value', 'input');

      expect('.container').toHaveDescendantWithText({
        selector: 'p',
        text: 'inputData: some value'
      });
    });

    it('should display typed value with proper class', () => {
      expect('p').toHaveClass('display-input');
    });
  });

  describe('style', () => {
    it('should have black border', () => {
      expect('.container').toHaveStyle({'border-color': '#000000'});
    });

    it('should switch border color to red after button click', () => {
      spectator.click('button');

      expect('div.container').toHaveStyle({'border-color': '#FF0000'});
    });
  });
});
