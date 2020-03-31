import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ComplaintsService {
  send({
    clientId,
    message,
  }: {
    clientId: string;
    message: string;
  }): Observable<number> {
    console.log(`SENDING: ups from '${clientId}', message: '${message}'`);

    // why not 1
    return of(1);
  }
}
