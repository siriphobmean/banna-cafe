
export interface PreordersInterface {
  ID?: number; 
  TotalAmount?: number;
  // PickupTime?: Date; 
  // PickupDate?: Date; 
  // PickupTime?: string; 
  // PickupDate?: string; 
  PickUpDateTime?: Date; 
  Note?: string;
  Respond?: string;
  MemberID?: number;
  Member?:MembersInterface;
} 

import { MembersInterface } from "./IMember";