import { IngredientsInterface } from "./IIngredient";
import { MenusInterface } from "./IMenu";

export interface IngredientMenusInterface {
    ID?: number; // ok
    Amount?: number; // ok

    MenuID?: number; // ok
    Menu?: MenusInterface; // ok

    IngredientID?: number; // ok
    Ingredient?: IngredientsInterface; // ok
  } // Clear!