import { IngredientsInterface } from "./IIngredient";
import { MenusInterface } from "./IMenu";
import { IngredientUnitsInterface } from "./IIngredientUnit";

export interface IngredientMenusInterface {
    ID?: number; // ok
    Amount?: number; // ok

    MenuID?: number; // ok
    MenuName?: string; // more
    Menu?: MenusInterface; // ok

    IngredientID?: number; // ok
    IngredientName?: string; // more
    Ingredient?: IngredientsInterface; // ok

    IngredientUnitID?: number;
    UnitName?: string;
    IngredientUnit?: IngredientUnitsInterface; // more 13/12/66 -> edit 15/12/66
  } // Clear!