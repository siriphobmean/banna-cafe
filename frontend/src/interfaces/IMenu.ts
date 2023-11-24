import { MenuTypesInterface } from "./IMenuType";

export interface MenusInterface {
  ID?: number; // ok
  MenuName?: string; // ok
  MenuNameEng?: string; // ok
  MenuCost?: number; // ok?
  MenuImage?: string; // ok
  
  MenuTypeID?: number; // ok
  MenuType?: MenuTypesInterface; // ok
} // Clear!