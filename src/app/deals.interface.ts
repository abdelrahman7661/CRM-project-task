export interface DealsType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  date: string;
  probability_status: string;
  state: string;
}
export interface new_deal_value_type {
  new_deals: {
    Potential: DealsType[];
    focus: DealsType[];
    contact_made: DealsType[];
    offer_sent: DealsType[];
    getting_ready: DealsType[];
  };
}
