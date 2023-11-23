import { MenuTypesInterface } from "./IMenuType";

export interface MenusInterface {
  ID?: number; // ok
  MenuName?: string; // ok
  MenuNameEng?: string; // ok
  MenuCost?: number; // ok?
  MenuTypeID?: number; // ok
  MenuType?: MenuTypesInterface; // ok
  MenuImage?: string; // ok
} // Clear!