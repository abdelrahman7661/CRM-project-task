import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DealsType } from './deals.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Services {
  private http = inject(HttpClient);
  api = 'https://my-json-server.typicode.com/hussein-hashima/contacts/db';

  private usersDealsData = signal<DealsType[]>([]);
  loadedUser = this.usersDealsData.asReadonly();

  getUsersData() {
    return this.http.get<{ deals: DealsType[] }>(this.api).pipe(
      tap({
        next: (users) => this.usersDealsData.set(users.deals),
      }),
    );
  }
}
