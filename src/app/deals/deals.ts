import { Component, inject, signal } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { DealsType } from '../deals.interface';
import { Services } from '../services';
import {
  CdkDrag,
  CdkDropListGroup,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deals',
  imports: [UserCard, CdkDrag, CdkDropListGroup, CdkDropList, FormsModule],
  templateUrl: './deals.html',
  styleUrl: './deals.css',
})
export class Deals {
  private services = inject(Services);
  usersDealsData = this.services.loadedUser;
  Potential_Value = signal<DealsType[]>([]);
  Focus = signal<DealsType[]>([]);
  Contact_Made = signal<DealsType[]>([]);
  Offer_Sent = signal<DealsType[]>([]);
  Getting_Ready = signal<DealsType[]>([]);

  errorMessage = signal(false);
  loading = signal(true);
  searchValue = signal('');
  disableDropFunc = false;

  ngOnInit() {
    this.services.getUsersData().subscribe({
      next: () => {
        this.filterDealsArray();
      },
      error: () => {
        this.errorMessage.set(true);
      },
      complete: () => {
        this.loading.set(false);
        this.getSavedDealsUsersData();
      },
    });
  }

  search() {
    this.getSavedDealsUsersData();

    let newPotentialValue = this.Potential_Value().filter((user) => {
      return (
        user.first_name.toLowerCase() == this.searchValue() ||
        user.last_name.toLowerCase() == this.searchValue()
      );
    });
    let newFocusValue = this.Focus().filter((user) => {
      return (
        user.first_name.toLowerCase() == this.searchValue() ||
        user.last_name.toLowerCase() == this.searchValue()
      );
    });
    let newContactValue = this.Contact_Made().filter((user) => {
      return (
        user.first_name.toLowerCase() == this.searchValue() ||
        user.last_name.toLowerCase() == this.searchValue()
      );
    });
    let newOfferValue = this.Offer_Sent().filter((user) => {
      return (
        user.first_name.toLowerCase() == this.searchValue() ||
        user.last_name.toLowerCase() == this.searchValue()
      );
    });
    let newGettingReadyValue = this.Getting_Ready().filter((user) => {
      return (
        user.first_name.toLowerCase() == this.searchValue() ||
        user.last_name.toLowerCase() == this.searchValue()
      );
    });
    // disable the drag func
    this.disableDropFunc = true;

    this.Potential_Value.set(newPotentialValue);
    this.Focus.set(newFocusValue);
    this.Contact_Made.set(newContactValue);
    this.Offer_Sent.set(newOfferValue);
    this.Getting_Ready.set(newGettingReadyValue);

    // to rest the search
    if (this.searchValue().length == 0) {
      this.getSavedDealsUsersData();
      this.disableDropFunc = false;
    }
  }

  filterDealsArray() {
    if (window.localStorage.length == 0) {
      console.log('filter id conddition runned');
      this.usersDealsData().map((e) => {
        if (e.status == 'Potential Value') {
          this.Potential_Value.update((prev) => [...prev, e]);
        } else if (e.status == 'Focus') {
          this.Focus.update((prev) => [...prev, e]);
        } else if (e.status == 'Contact Made') {
          this.Contact_Made.update((prev) => [...prev, e]);
        } else if (e.status == 'Offer Sent') {
          this.Offer_Sent.update((prev) => [...prev, e]);
        } else if (e.status == 'Getting Ready') {
          this.Getting_Ready.update((prev) => [...prev, e]);
        }
      });
      this.save();
    }
  }

  drop(event: CdkDragDrop<DealsType[]>) {
    if (this.disableDropFunc) {
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.save();
  }

  save() {
    window.localStorage.setItem('Potential_Value', JSON.stringify(this.Potential_Value()));
    window.localStorage.setItem('Focus', JSON.stringify(this.Focus()));
    window.localStorage.setItem('Contact_Made', JSON.stringify(this.Contact_Made()));
    window.localStorage.setItem('Offer_Sent', JSON.stringify(this.Offer_Sent()));
    window.localStorage.setItem('Getting_Ready', JSON.stringify(this.Getting_Ready()));
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
}
