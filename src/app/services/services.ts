import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { DealsType, new_deal_value_type } from '../deals.interface';

@Injectable({
  providedIn: 'root',
})
export class Services {
  private http = inject(HttpClient);
  api = 'https://my-json-server.typicode.com/hussein-hashima/contacts/db';

  users_Deals_Data = signal<DealsType[]>([]);
  testFromService = signal({});
  Potential_Value = signal<DealsType[]>([]);
  Focus = signal<DealsType[]>([]);
  Contact_Made = signal<DealsType[]>([]);
  Offer_Sent = signal<DealsType[]>([]);
  Getting_Ready = signal<DealsType[]>([]);

  getUsersData() {
    // this.users_Deals_Data.set([]); >> a quick fix
    return this.http.get<{ deals: DealsType[] }>(this.api).pipe(
      tap({
        next: (users) => {
          this.users_Deals_Data.set(users.deals);

          if (window.localStorage.length == 0) {
            this.filterDeals();
            this.filter_api_data();
            this.create_save('');
          }
        },
        complete: () => {
          this.getSavedDealsUsersData();
        },
      }),
    );
  }

  filter_api_data() {
    let new_deals_value: new_deal_value_type = {
      new_deals: {
        potential: [],
        focus: [],
        contact_made: [],
        offer_sent: [],
        getting_ready: [],
      },
    };

    this.users_Deals_Data().map((value) => {
      if (value.status == 'Potential Value') {
        new_deals_value.new_deals.potential.push(value);
      } else if (value.status == 'Focus') {
        new_deals_value.new_deals.focus.push(value);
      } else if (value.status == 'Contact Made') {
        new_deals_value.new_deals.contact_made.push(value);
      } else if (value.status == 'Offer Sent') {
        new_deals_value.new_deals.offer_sent.push(value);
      } else if (value.status == 'Getting Ready') {
        new_deals_value.new_deals.getting_ready.push(value);
      }
    });

    // save to local storage
    // window.localStorage.setItem('new_deals_value', JSON.stringify(new_deals_value));
    this.create_save(new_deals_value);
  }

  add_new_deal(status: string, deal_Data: any) {
    // let value = window.localStorage.getItem('new_deals_value')!;
    // // let old_deals_values = JSON.parse(value);
    // if (status == 'Potential Value') {
    //   this.Potential_Value.update((prevData) => [deal_Data, ...prevData]);
    // } else if (status == 'Focus') {
    //   this.Focus.update((prevData) => [deal_Data, ...prevData]);
    // } else if (status == 'Contact') {
    //   this.Contact_Made.update((prevData) => [deal_Data, ...prevData]);
    // } else if (status == 'Offer Sent') {
    //   this.Offer_Sent.update((prevData) => [deal_Data, ...prevData]);
    // } else if (status == 'Getting Ready') {
    //   this.Getting_Ready.update((prevData) => [deal_Data, ...prevData]);
    // }
    // this.create_save('');
  }

  filterDeals() {
    this.users_Deals_Data().map((x) => {
      if (x.status == 'Potential Value') {
        this.Potential_Value.update((prev) => [...prev, x]);
      } else if (x.status == 'Focus') {
        this.Focus.update((prev) => [...prev, x]);
      } else if (x.status == 'Contact Made') {
        this.Contact_Made.update((prev) => [...prev, x]);
      } else if (x.status == 'Offer Sent') {
        this.Offer_Sent.update((prev) => [...prev, x]);
      } else if (x.status == 'Getting Ready') {
        this.Getting_Ready.update((prev) => [...prev, x]);
      }
    });
  }

  create_save(data: any) {
    window.localStorage.setItem('Potential_Value', JSON.stringify(this.Potential_Value()));
    window.localStorage.setItem('Focus', JSON.stringify(this.Focus()));
    window.localStorage.setItem('Contact_Made', JSON.stringify(this.Contact_Made()));
    window.localStorage.setItem('Offer_Sent', JSON.stringify(this.Offer_Sent()));
    window.localStorage.setItem('Getting_Ready', JSON.stringify(this.Getting_Ready()));
    window.localStorage.setItem('new_deals_value', JSON.stringify(data));
  }

  getSavedDealsUsersData() {
    // get the data from localStorage
    let Potential_Value = window.localStorage.getItem('Potential_Value') || '';
    let Focus = window.localStorage.getItem('Focus') || '';
    let Contact_Made = window.localStorage.getItem('Contact_Made') || '';
    let Offer_Sent = window.localStorage.getItem('Offer_Sent') || '';
    let Getting_Ready = window.localStorage.getItem('Getting_Ready') || '';
    //update it
    this.Potential_Value.set(JSON.parse(Potential_Value));
    this.Focus.set(JSON.parse(Focus));
    this.Contact_Made.set(JSON.parse(Contact_Made));
    this.Offer_Sent.set(JSON.parse(Offer_Sent));
    this.Getting_Ready.set(JSON.parse(Getting_Ready));
  }
  // getSavedDealsUsersData_v2() {
  //   const data = window.localStorage.getItem('New_Deal') || '';
  //   const newData: DealsType[] = JSON.parse(data);
  //   // this.filterDeals_v2(JSON.parse(data));

  //   // to rest its value
  //   // this.Potential_Value.set([]);
  //   this.Focus.set([]);
  //   this.Contact_Made.set([]);
  //   this.Offer_Sent.set([]);
  //   this.Getting_Ready.set([]);

  //   newData.map((x) => {
  //     if (x.status == 'Potential Value') {
  //       console.log(x.status);
  //       this.Potential_Value.update((prev) => [...prev, x]);
  //     } else if (x.status == 'Focus') {
  //       this.Focus.update((prev) => [...prev, x]);
  //     } else if (x.status == 'Contact Made') {
  //       this.Contact_Made.update((prev) => [...prev, x]);
  //     } else if (x.status == 'Offer Sent') {
  //       this.Offer_Sent.update((prev) => [...prev, x]);
  //     } else if (x.status == 'Getting Ready') {
  //       this.Getting_Ready.update((prev) => [...prev, x]);
  //     }
  //   });
  // }
  rest() {
    window.localStorage.setItem('Potential_Value', '');
    window.localStorage.setItem('Focus', '');
    window.localStorage.setItem('Contact_Made', '');
    window.localStorage.setItem('Offer_Sent', '');
    window.localStorage.setItem('Getting_Ready', '');
  }
}
