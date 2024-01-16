import { MembersInterface } from "./IMember";

export interface ManagePreOrderInterface {
  PreorderID?: number;
  //CreateAt?: Date;
  PickupTime?: Date;
  ApproveStatus?: string;
  ReceiveStatus?: string;
  Price?: Float32Array;
  MemmberID?: number;
  MemberName?: string;
  Slipt?: string;
  Respond?: string;
  Note?: string;
}
export interface PreOrderInterface {
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ID?: number;
  Member?: MembersInterface;
  MemberID?: number;
  DeletedAt?: Date;
  TotalAmount?: Float32Array;
  PickupTime?: Date;
  Note?: string;
  Respond?: string;
  StatusApprovePreOrderInterface?: StatusApproveInterface;
  StatusReceivePreOrderInterface?: StatusReceiveInterface;
}

export interface StatusApproveInterface {
  ID?: number;
  Name?: string;
}

export interface StatusReceiveInterface {
  ID?: number;
  Name?: string;
}

export interface StatusApprovesPreOrderInterface {
  ID?: number;
  PreOrderID?: number;
  PreOrder?: PreOrderInterface;
  StatusApprovePreOrderID?: number;
  StatusApprovePreOrder?: StatusApproveInterface;
}

export interface StatusReceivesPreOrderInterface {
  ID?: number;
  PreOrderID?: number;
  PreOrder?: PreOrderInterface;
  StatusReceivePreOrderID?: number;
  StatusReceivePreOrder?: StatusReceiveInterface;
}
