import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriorityClientsService {
  isPriority(clientId: string): boolean {
    return clientId.includes('sponsor');
  }
}
