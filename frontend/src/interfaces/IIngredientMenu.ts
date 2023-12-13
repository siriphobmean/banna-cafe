import { IngredientsInterface } from "./IIngredient";
import { MenusInterface } from "./IMenu";
import { MenuUnitsInterface } from "./IMenuUnit";

export interface IngredientMenusInterface {
    ID?: number; // ok
    Amount?: number; // ok

    MenuID?: number; // ok
    Menu?: MenusInterface; // ok

    IngredientID?: number; // ok
    Ingredient?: IngredientsInterface; // ok

    MenuUnitID?: number;
    MenuUnit?: MenuUnitsInterface; // more 13/12/66
  } // Clear!