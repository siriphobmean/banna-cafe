export interface PreorderMenusInterface {
    ID?: number; 
    Quantity?: number;
    TotalCost?: number;
 
    MenuID?: number;
    Menu?: MenusInterface;
    PreorderID?: number;
    Preoeder?: PreordersInterface;
    MenuSizeID?: number;
    MenuSize?: MenuSizesInterface;
    MenuSizeStatus?: number;
    SweetnessID?: number;
    Sweetness?: SweetnessesInterface;
    SweetnessStatus?: number;
    DrinkOptionID?: number;
    DrinKOption?: OptionDrinksInterface;
    DrinkOptionStatus?: number;
} 

import { PreordersInterface } from "./IPreorder";
import { MenusInterface } from "./IMenu";
import { MenuSizesInterface } from "./IMenuSize";import { SweetnessesInterface } from "./ISweetness";
import { OptionDrinksInterface } from "./IOptionDrink";

