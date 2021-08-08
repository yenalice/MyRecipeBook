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
export class Instruction {
    @PrimaryGeneratedColumn({ type: "int" })
    instructionId: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.recipeId)
    @JoinColumn({ name: "recipeId" })
    recipeId: number;

    @Column({ type: "varchar", length: 3000 })
    step: string;

    @Column({ type: "int" })
    order: number;
}

let connection: Connection;

export async function getInstructionRepository(): Promise<
    Repository<Instruction>
> {
    if (connection === undefined) {
        connection = await createConnection({
            name: "instructionConnection",
            type: "mysql",
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [Instruction, Recipe],
        });
    }
    return connection.getRepository(Instruction);
}
