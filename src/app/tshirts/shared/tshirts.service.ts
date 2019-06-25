import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Tshirt } from './model/tshirt.model';

const TSHIRTS: Tshirt[] = [
  { name: 'another fancy sweater', imageUrl: 'assets/tshirts/img/another-fancy-sweater.png' },
  { name: 'black', imageUrl: 'assets/tshirts/img/black.png' },
  { name: 'blue', imageUrl: 'assets/tshirts/img/blue.png' },
  { name: 'fancy sweater', imageUrl: 'assets/tshirts/img/fancy-sweater.png' },
  { name: 'kiwi', imageUrl: 'assets/tshirts/img/kiwi.png' },
  { name: 'red which was washed yesterday', imageUrl: 'assets/tshirts/img/red-washed-yesterday.png' },
  { name: 'red', imageUrl: 'assets/tshirts/img/red.png' },
  { name: 'white', imageUrl: 'assets/tshirts/img/white.png' }
];

@Injectable({
  providedIn: 'root'
})
export class TshirtsService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<Tshirt[]> {
    return of(TSHIRTS);
  }
}
