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
    @PrimaryGeneratedColumn()
    nutrientId: number;

    @ManyToOne((type) => Recipe, (recipe) => recipe.recipeId)
    @JoinColumn({ name: "recipeId", referencedColumnName: "recipeId" })
    recipeId: number;

    @Column()
    name: string;

    @Column()
    amount: number;

    @Column()
    unit: string;

    @Column()
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
