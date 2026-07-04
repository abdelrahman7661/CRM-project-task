import { Component, inject, signal } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { DealsType } from '../deals.interface';
import {
  CdkDrag,
  CdkDropListGroup,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { NewDealPopup } from '../new-deal-popup/new-deal-popup';
import { Services } from '../services/services';

@Component({
  selector: 'app-deals',
  imports: [UserCard, CdkDrag, CdkDropListGroup, CdkDropList, FormsModule, NewDealPopup],
  templateUrl: './deals.html',
  styleUrl: './deals.css',
})
export class Deals {
  protected services = inject(Services);

  errorMessage = signal(false);
  loading = signal(true);
  searchValue = signal('');
  searchResultValue = signal<DealsType[]>([]);
  showSearchResultCard = false;
  disableDropFunc = false;
  showNewDealPopup = false;
  // >>>>>
  deals_values: any = {};

  ngOnInit() {
    this.services.getUsersData().subscribe({
      error: () => {
        this.errorMessage.set(true);
      },
      complete: () => {
        let x = window.localStorage.getItem('new_deals_value')!;
        this.deals_values = JSON.parse(x);
        this.loading.set(false);
      },
    });
  }

  search_v2() {
    this.showSearchResultCard = true;
    let searchResultValue = this.services.users_Deals_Data().filter((user) => {
      return user.first_name.toLowerCase().includes(this.searchValue());
    });
    this.searchResultValue.set(searchResultValue);
    // when to show the search card
    if (this.searchValue().length == 0 || searchResultValue.length == 0) {
      this.showSearchResultCard = false;
    }
  }

  clearSearchValue() {
    this.searchValue.set('');
    this.search_v2();
  }

  deal_popup() {
    this.showNewDealPopup = true;
  }

  close_deal_popup() {
    this.showNewDealPopup = false;
    console.log('closed');
  }

  rest() {
    window.localStorage.clear();
  }

  drop(event: CdkDragDrop<DealsType[]>) {
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
    console.log(this.deals_values);
    this.services.create_save(this.deals_values);
  }
}
