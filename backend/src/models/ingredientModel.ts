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
    amount: number;

    @Column()
    name: string;
}

let connection: Connection;

export async function getIngredientRepository(): Promise<
    Repository<Ingredient>
> {
    if (connection === undefined) {
        connection = await createConnection({
            type: "sqlite",
            database: "myangularapp",
            synchronize: true,
            entities: [Ingredient],
        });
    }
    return connection.getRepository(Ingredient);
}
