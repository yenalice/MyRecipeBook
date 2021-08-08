import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    createConnection,
    Connection,
    Repository,
} from "typeorm";
import { Recipe } from "./recipeModel";

require("dotenv").config();

@Entity()
export class Nutrient {
    @PrimaryGeneratedColumn({ type: "int" })
    nutrientId: number;

    @ManyToOne((type) => Recipe, (recipe) => recipe.recipeId)
    @JoinColumn({ name: "recipeId", referencedColumnName: "recipeId" })
    recipeId: number;

    @Column({ type: "varchar", length: 350 })
    name: string;

    @Column({ type: "int" })
    amount: number;

    @Column({ type: "varchar", length: 50 })
    unit: string;

    @Column({ type: "int" })
    percentOfDailyNeeds: number;
}

let connection: Connection;

export async function getNutrientRepository(): Promise<Repository<Nutrient>> {
    if (connection === undefined) {
        connection = await createConnection({
            name: "nutrientConnection",
            type: "mysql",
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [Nutrient, Recipe],
        });
    }
    return connection.getRepository(Nutrient);
}
