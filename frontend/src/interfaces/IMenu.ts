import { MenuTypesInterface } from "./IMenuType";

export interface MenusInterface {
  ID?: number; // ok
  MenuID?: number; // new
  MenuName?: string; // ok
  MenuNameEng?: string; // ok
  MenuCost?: number; // ok?
  MenuImage?: string; // ok
  MenuStatus?: number; // more
  
  MenuTypeID?: number; // ok
  MenuType?: MenuTypesInterface; // ok
} // Clear!