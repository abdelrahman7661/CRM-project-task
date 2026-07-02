import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Services } from '../services/services';

@Component({
  selector: 'app-new-deal-popup',
  imports: [ReactiveFormsModule],
  templateUrl: './new-deal-popup.html',
  styleUrl: './new-deal-popup.css',
})
export class NewDealPopup {
  private services = inject(Services);
  close = output();

  closePopup() {
    this.close.emit();
  }
  max_length_input = 20;

  new_deal = new FormGroup({
    first_name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(this.max_length_input),
      Validators.required,
    ]),
    last_name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(this.max_length_input),
      Validators.required,
    ]),
    phone: new FormControl('', [Validators.minLength(5), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    company: new FormControl('', [Validators.required]),
    probability_status: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    status: new FormControl('Potential Value', Validators.required),
  });

  get error_first_name() {
    return (
      this.new_deal.controls.first_name.dirty &&
      this.new_deal.controls.first_name.touched &&
      this.new_deal.controls.first_name.invalid
    );
  }
  get error_last_name() {
    return (
      this.new_deal.controls.last_name.dirty &&
      this.new_deal.controls.last_name.touched &&
      this.new_deal.controls.last_name.invalid
    );
  }
  get error_probability_status() {
    return (
      this.new_deal.controls.probability_status.dirty &&
      this.new_deal.controls.probability_status.touched &&
      this.new_deal.controls.probability_status.invalid
    );
  }

  submit() {
    if (this.new_deal.valid) {
      console.log('form is valid');
      const idd = crypto.randomUUID();
      const date = new Date();
      // Adding the new Deal
      let dealData = { ...this.new_deal.value, id: idd, date: date, state: 'New' };
      // to check the type of new deal status type value
      this.services.add_new_deal(this.new_deal.value.status!, dealData);
      this.new_deal.reset();
    } else {
      console.log('form is invalid');
      this.new_deal.markAllAsTouched();
      return;
    }
  }
}
