import { Routes } from '@angular/router';
import { Deals } from './deals/deals';
import { Activites } from './activites/activites';
import { Statistices } from './statistices/statistices';
import { Setting } from './setting/setting';
import { ErrorPage } from './error-page/error-page';
import { NewDealPopup } from './new-deal-popup/new-deal-popup';

export const routes: Routes = [
  { path: '', component: Deals },
  // {
  //   path: '',
  //   children: [
  //     { path: 'deals', component: Deals },
  //     { path: 'new', component: NewDealPopup },
  //   ],
  // },
  { path: 'Activites', component: Activites },
  { path: 'Statistices', component: Statistices },
  { path: 'Setting', component: Setting },
  { path: '**', component: ErrorPage },
];
