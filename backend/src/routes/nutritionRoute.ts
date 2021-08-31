import { NextFunction, Request, Response, Router } from "express";
import { getNutrientRepository, Nutrient } from "../models/nutrientModel";

export const router: Router = Router();

// insert nutrient(s) to database given a nutrients json
export async function insertNutrients(nutrients, recipeId) {
    const nutrientsRepo = await getNutrientRepository();
    let nutrientList: Nutrient[] = [];
    for (let i = 0; i < nutrients.length; i++) {
        let nutrient = new Nutrient();
        nutrient.recipeId = recipeId;
        nutrient.name = nutrients[i].name;
        nutrient.amount = nutrients[i].amount;
        nutrient.unit = nutrients[i].unit;
        nutrient.percentOfDailyNeeds = nutrients[i].percentOfDailyNeeds;

        nutrientList.push(nutrient);
    }
    nutrientsRepo.save(nutrientList);
}
