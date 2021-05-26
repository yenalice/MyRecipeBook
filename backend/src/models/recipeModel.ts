import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    createConnection,
    Connection,
    Repository,
} from "typeorm";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column() // how to make this unique & auto-generated/incremented??
    ingredientsId: number;

    @Column()
    ownerId: number;

    @Column()
    cookTime: number; // in minutes

    @Column()
    dateCreated: Date;
}

let connection: Connection;

// TODO: move this into module or smth????
export async function getRecipeRepository(): Promise<Repository<Recipe>> {
    if (connection === undefined) {
        connection = await createConnection({
            type: "sqlite",
            database: "myangularapp",
            synchronize: true,
            entities: [Recipe],
        });
    }
    return connection.getRepository(Recipe);
}
