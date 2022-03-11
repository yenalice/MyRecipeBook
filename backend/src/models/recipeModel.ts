import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    createConnection,
    Connection,
    Repository,
    CreateDateColumn,
} from "typeorm";

require("dotenv").config();

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    // TODO: in UI, enforce max length of chars for each field
    // DESIGN QUESTION: I wanted to make title, summary, etc. non-null. So I marked it as non-null in MYSQL, but then it required a default value. So does it make more sense to provide it with a default value or just put the responsibility of requiring a field onto the client side??
    @Column()
    title: string;

    @Column({ nullable: true })
    summary: string;

    // @Column()
    // ownerId: number;

    // @Column()
    // cookTime: number; // in minutes

    @CreateDateColumn()
    dateCreated: Date;

    // @Column()
    // rating: number;

    @Column()
    imageUrl: string;

    // @Column()
    // ingredientsId: number;

    // @Column()
    // calories: number;

    // @Column()
    // carbs: string;

    // @Column()
    // fat: string;

    // @Column()
    // protein: string;

    // @Column()
    // sugar: string;
}

let connection: Connection;

// TODO: move this into module or smth????
export async function getRecipeRepository(): Promise<Repository<Recipe>> {
    if (connection === undefined) {
        connection = await createConnection({
            type: "mysql",
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [Recipe],
        });
    }
    return connection.getRepository(Recipe);
}
