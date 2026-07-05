import { Component, inject } from '@angular/core';
import { Services } from '../services/services';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {
  protected services = inject(Services);

  popupState = false;
  showPopup() {
    this.popupState = true;
  }
  restSavedData() {
    window.localStorage.clear();
    this.popupState = false;
  }
  cancel() {
    this.popupState = false;
  }
}
