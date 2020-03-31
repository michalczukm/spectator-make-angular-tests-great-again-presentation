import {Spectator, createComponentFactory, mockProvider, SpyObject} from '@ngneat/spectator';
import {ToastrService} from 'ngx-toastr';
import {of} from 'rxjs';
import {TshirtsComponent} from './tshirts.component';
import {CartService, TshirtsService} from './shared';
import {TshirtItemComponent} from './components/tshirt-item/tshirt-item.component';

describe('TshirtsComponentSpectator', () => {
  let spectator: Spectator<TshirtsComponent>;

  const createComponent = createComponentFactory({
    component: TshirtsComponent,
    declarations: [TshirtItemComponent],
    providers: [mockProvider(CartService), mockProvider(TshirtsService), mockProvider(ToastrService)]
  });

  beforeEach(() => {
    spectator = createComponent({
      detectChanges: false
    });

    spectator.inject<TshirtsService>(TshirtsService).get.and.returnValue(of([
      {
        name: 'sample tshirt 1',
        imageUrl: 'https://example.com/image-1.png'
      }, {
        name: 'sample tshirt 2',
        imageUrl: 'https://example.com/image-2.png'
      }
    ]));

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('display items', () => {
    it('should display all tshirts', () => {
      expect('app-tshirt-item').toHaveLength(2);
    });
  });

  describe('buy item', () => {
    it('should buy second item when clicked event emited', () => {
      // arrange
      const cartService: CartService & SpyObject<CartService> = spectator.inject<CartService>(CartService);

      // act
      const items: TshirtItemComponent[] = spectator.queryAll<TshirtItemComponent>(TshirtItemComponent);
      items[1].buyClicked.emit({
        name: 'sample tshirt 2',
        imageUrl: 'https://example.com/image-2.png'
      });

      // assert
      expect(cartService.buy).toHaveBeenCalledWith(
        {
          name: 'sample tshirt 2',
          imageUrl: 'https://example.com/image-2.png'
        });
    });

    it('should show toast on success', () => {
      // arrange
      const cartService: CartService & SpyObject<CartService> = spectator.inject<CartService>(CartService);
      cartService.buy.and.returnValue(of(undefined));

      const toastrService: ToastrService & SpyObject<ToastrService> = spectator.inject<ToastrService>(ToastrService);

      const items: TshirtItemComponent[] = spectator.queryAll<TshirtItemComponent>(TshirtItemComponent);

      // act
      items[1].buyClicked.emit({
        name: 'sample tshirt 2',
        imageUrl: 'https://example.com/image-2.png'
      });

      // assert
      expect(toastrService.success).toHaveBeenCalledWith('You just bought sample tshirt 2');
    });
  });
});
