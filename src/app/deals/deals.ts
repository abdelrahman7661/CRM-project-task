import { Component, inject, signal } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { DealsType } from '../deals.interface';
import { CdkDrag, CdkDropListGroup, CdkDropList } from '@angular/cdk/drag-drop';
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

  usersDealsData = signal<DealsType[]>([]);

  errorMessage = signal(false);
  loading = signal(true);
  searchValue = signal('');
  searchResultValue = signal<DealsType[]>([]);
  showSearchResultCard = false;
  disableDropFunc = false;
  showNewDealPopup = false;

  ngOnInit() {
    this.services.getUsersData().subscribe({
      error: () => {
        this.errorMessage.set(true);
      },
      complete: () => {
        this.loading.set(false);
        // console.log(this.services.users_Deals_Data());
        // console.log(this.services.Potential_Value());
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
}
