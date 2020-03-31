import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tshirt, CartService, TshirtsService } from './shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tshirts',
  templateUrl: './tshirts.component.html',
  styleUrls: ['./tshirts.component.css'],
})
export class TshirtsComponent implements OnInit {
  tshirts$: Observable<Tshirt[]>;

  constructor(
    private tshirtsService: TshirtsService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tshirts$ = this.tshirtsService.get();
  }

  buy(tshirt: Tshirt): void {
    this.cartService.buy(tshirt).subscribe(
      () => this.toastr.success(`You just bought ${tshirt.name}`),
      () => this.toastr.error('Something went wrong', ':(')
    );
  }
}
