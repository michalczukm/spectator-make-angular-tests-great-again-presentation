import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tshirt } from './model/tshirt.model';
import { PriorityClientsService } from './priority-clients.service';
import { ComplaintsService } from './complaints.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private priorityClientsService: PriorityClientsService,
    private complaintsService: ComplaintsService
  ) {}

  buy(thirt: Tshirt): Observable<void> {
    console.log(`${thirt.name} bought!`);

    return of(undefined);
  }

  sendComplaint(message: string, clientId: string): Observable<number> {
    if (this.priorityClientsService.isPriority(clientId)) {
      return this.complaintsService.send({
        clientId,
        message,
      });
    } else {
      // why not 10
      return of(10);
    }
  }
}
