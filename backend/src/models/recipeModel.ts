import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    createConnection,
    Connection,
    Repository,
    CreateDateColumn,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { Ingredient } from "./ingredientModel";
import { Nutrient } from "./nutrientModel";
import { Instruction } from "./instructionModel";

require("dotenv").config();

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()

    /*
    @OneToMany(() => Ingredient, (ingredient) => ingredient.recipeId, {
        cascade: true,
    })
    @OneToMany(() => Nutrient, (nutrient) => nutrient.recipeId, {
        cascade: true,
    })
    @OneToMany(() => Instruction, (instruction) => instruction.recipeId, {
        cascade: true,
    })
    */
    recipeId: number;

    // TODO: in UI, enforce max length of chars for each field
    // DESIGN QUESTION: I wanted to make title, summary, etc. non-null. So I marked it as non-null in MYSQL, but then it required a default value. So does it make more sense to provide it with a default value or just put the responsibility of requiring a field onto the client side??
    @Column()
    title: string;

    @Column({ nullable: true })
    summary: string;

    // @Column()
    // ownerId: number;

    @Column({ nullable: true })
    cookTime: number; // in minutes

    @CreateDateColumn()
    dateCreated: Date;

    // @Column()
    // rating: number;

    @Column()
    imageUrl: string;
}

let connection: Connection;

// TODO: move this into module or smth????
export async function getRecipeRepository(): Promise<Repository<Recipe>> {
    if (connection === undefined) {
        connection = await createConnection({
            name: "recipeConnection",
            type: "mysql",
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [Recipe, Ingredient, Nutrient, Instruction],
        });
    }
    return connection.getRepository(Recipe);
}
