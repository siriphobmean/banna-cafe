export interface PreorderMenusInterface {
    ID?: number; 
    Quantity?: number;
    TotalCost?: string;
    
    MenuID?: number;
    Menu?: MenusInterface;
    PreorderID?: number;
    Preoeder?: PreordersInterface;
    MenuSizeID?: number;
    MenuSize?: MenuSizesInterface;
    SweetnessID?: number;
    Sweetness?: SweetnessesInterface;
    OptionDrinkID?: number;
    OptionDrin?: OptionDrinksInterface;
} 

import { PreordersInterface } from "./IPreorder";
import { MenusInterface } from "./IMenu";
import { MenuSizesInterface } from "./IMenuSize";import { SweetnessesInterface } from "./ISweetness";
import { OptionDrinksInterface } from "./IOptionDrink";

