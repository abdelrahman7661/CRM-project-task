import { Component, input } from '@angular/core';
import { DealsType } from '../deals.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  userCardData = input<DealsType>();
  status = input<string>('');
}
