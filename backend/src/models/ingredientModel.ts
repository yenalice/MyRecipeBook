import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    createConnection,
    Connection,
    Repository,
    JoinColumn,
} from "typeorm";
import { Recipe } from "./recipeModel";

require("dotenv").config();

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn({ type: "int" })
    ingredientId: number;

    @ManyToOne((type) => Recipe, (recipe) => recipe.recipeId)
    @JoinColumn({ name: "recipeId", referencedColumnName: "recipeId" })
    recipeId: number;

    @Column({ type: "varchar", length: 350 })
    name: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number;

    @Column({ type: "varchar", length: 50 })
    unit: string;
}

let connection: Connection;

export async function getIngredientRepository(): Promise<
    Repository<Ingredient>
> {
    if (connection === undefined) {
        connection = await createConnection({
            name: "ingredientConnection",
            type: "mysql",
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [Ingredient, Recipe],
        });
    }
    return connection.getRepository(Ingredient);
}
