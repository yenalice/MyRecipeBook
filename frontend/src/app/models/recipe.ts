export interface Recipe {
  recipeId: number;
  title: string;
  summary?: string;
  cookTime?: number;
  dateCreated: Date;
  imageUrl: string;
}
