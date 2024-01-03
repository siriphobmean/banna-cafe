
export interface PreordersInterface {
  ID?: number; 
  TotalAmount?: number;
  PickupTime?: string; 
  PickupDate?: string; 
  Note?: string;
  Respond?: string;
  MemberID?: number;
  Member?:MembersInterface;
} 

import { MembersInterface } from "./IMember";