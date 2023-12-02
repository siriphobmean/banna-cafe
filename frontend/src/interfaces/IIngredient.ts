import { IngredientTypesInterface } from "./IIngredientType";

export interface IngredientsInterface { // Update By Nop 2/12/2566
  ID?: number; // ok
  IngredientName?: string; // ok
  IngredientCost?: number; // ok?
  IngredientAmount?: number; // ok
  IngredientImage?: string;
  IngredientExpert?: Date;

  IngredientTypeID?: number; // ok
  IngredientType?: IngredientTypesInterface; // ok
} // Clear!