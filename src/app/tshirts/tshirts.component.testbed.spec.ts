import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';

import {TshirtsComponent} from './tshirts.component';
import {CartService, Tshirt, TshirtsService} from './shared';
import {TshirtItemComponent} from './components/tshirt-item/tshirt-item.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';

const getTshirtServiceMock = () => ({
  get: () => of([{
    name: 'sample tshirt 1',
    imageUrl: 'https://example.com/image-1.png'
  }, {
    name: 'sample tshirt 2',
    imageUrl: 'https://example.com/image-2.png'
  }] as Tshirt[])
} as Partial<TshirtsService>);

const getCartServiceMock = () => ({
  buy: () => of(undefined)
} as Partial<CartService>);

describe('TshirtsComponentTestBed', () => {
  let component: TshirtsComponent;
  let fixture: ComponentFixture<TshirtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TshirtsComponent, TshirtItemComponent],
      providers: [
        {
          provide: TshirtsService,
          useValue: getTshirtServiceMock()
        },
        {
          provide: CartService,
          useValue: getCartServiceMock()
        }
      ],
      imports: [ToastrModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TshirtsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('display items', () => {
    it('should display all tshirts', () => {
      const items: TshirtItemComponent[] =
        fixture.debugElement.queryAll(
          By.directive(TshirtItemComponent)
        ).map(c => c.componentInstance);

      expect(items.map(c => c.item)).toEqual([{
        name: 'sample tshirt 1',
        imageUrl: 'https://example.com/image-1.png'
      }, {
        name: 'sample tshirt 2',
        imageUrl: 'https://example.com/image-2.png'
      }]);
      expect(items.length).toBe(2);
    });
  });

  describe('buy item', () => {
    it('should buy second item when clicked event emited', () => {
      // arrange
      const cartService: CartService = TestBed.get<CartService>(CartService);
      spyOn(cartService, 'buy').and.stub();

      const items: TshirtItemComponent[] = fixture.debugElement.queryAll(By.directive(TshirtItemComponent)).map(c => c.componentInstance);

      // act
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
      const cartService: CartService = TestBed.get<CartService>(CartService);
      spyOn(cartService, 'buy').and.returnValue(of(undefined));

      const toastrService: ToastrService = TestBed.get<ToastrService>(ToastrService);
      spyOn(toastrService, 'success').and.stub();

      const items: TshirtItemComponent[] = fixture.debugElement.queryAll(By.directive(TshirtItemComponent)).map(c => c.componentInstance);

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
