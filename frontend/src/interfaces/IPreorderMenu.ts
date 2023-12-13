export interface PreorderMenusInterface {
    ID?: number; 
    Quantity?: number;
    TotalCost?: string;
    Size?: string; 
    Sweetness?: string; 
    Option?: string;
    
    MenuID?: number;
    Menu?: MenusInterface;
    PreorderID?: number;
    Preoeder?: PreordersInterface;
} 

import { PreordersInterface } from "./IPreorder";
import { MenusInterface } from "./IMenu";