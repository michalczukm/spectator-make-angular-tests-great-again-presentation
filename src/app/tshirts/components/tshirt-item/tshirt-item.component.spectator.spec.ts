import {Spectator, createTestComponentFactory} from '@netbasal/spectator';
import {TshirtItemComponent} from './tshirt-item.component';

describe('TshirtItemComponentSpectator', () => {
  let spectator: Spectator<TshirtItemComponent>;

  const createComponent: (
    componentParameters?: Partial<TshirtItemComponent>,
    detectChanges?: boolean
  ) => Spectator<TshirtItemComponent> = createTestComponentFactory({
    component: TshirtItemComponent
  });

  beforeEach(() => {
    spectator = createComponent({
      item: {
        imageUrl: 'https://example.com/image.png',
        name: 'some tshirt'
      }
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('basic display', () => {
    it('should display img', () => {
      const image: Element = spectator.query('img');

      expect(image).toHaveProperty('src', 'https://example.com/image.png');
    });

    it('should display item name', () => {
      expect('h4').toHaveText('some tshirt');
    });
  });

  describe('buy item', () => {
    it('should emit buy item event on click', () => {
      spectator.component.buyClicked.subscribe(actualEvent => {
        expect(actualEvent).toEqual({
          imageUrl: 'https://example.com/image.png',
          name: 'some tshirt'
        });
      });

      spectator.click('button');
    });
  });

  describe('disable buy', () => {
    it('should disable buy if configured', () => {
      spectator.setInput({
        buyDisabled: true
      });

      expect('button').not.toExist();
    });
  });
});
