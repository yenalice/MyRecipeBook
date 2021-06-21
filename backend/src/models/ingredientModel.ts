import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    createConnection,
    Connection,
    Repository,
} from "typeorm";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    recipeId: number;

    @Column()
    amount: number;

    @Column()
    unit: number;

    @Column()
    name: string;
}

let connection: Connection;

export async function getIngredientRepository(): Promise<
    Repository<Ingredient>
> {
    // TODO:
    // make this neater; move into connection pool with others, use .env file, etc.
    // delete connect.ts file, move .env into directory of connection pool file
    if (connection === undefined) {
        connection = await createConnection({
            type: "mysql",
            username: "myrecipebook",
            password: "yummy!!",
            database: "myrecipebook",
            synchronize: true,
            entities: [Ingredient],
        });
    }
    return connection.getRepository(Ingredient);
}
