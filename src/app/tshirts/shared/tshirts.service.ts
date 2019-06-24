import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tshirt} from './model/tshirt.model';

@Injectable({
  providedIn: 'root'
})
export class TshirtsService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<Tshirt[]> {
    return this.http.get<Tshirt[]>('http://localhost:3000/tshirts');
  }
}
