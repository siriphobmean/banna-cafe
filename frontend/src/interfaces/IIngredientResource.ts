import { IngredientsInterface } from "./IIngredient";
import { ResourceInterface } from "./IResource";

export interface IngredientResourceInterface { // Update By Nop 2/12/2566
  ID?: number; // ok
  IngredientID?: number; // ok
  Ingredient?: IngredientsInterface; // ok

  ResourceID?: number; // ok
  Resource?: ResourceInterface; // ok
} // Clear!