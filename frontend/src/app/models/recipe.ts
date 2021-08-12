import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

export interface Recipe {
  recipeId: number;
  title: string;
  summary?: string;
  cookTime?: number;
  dateCreated?: Date; // also not created until insert
  imageUrl?: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}
