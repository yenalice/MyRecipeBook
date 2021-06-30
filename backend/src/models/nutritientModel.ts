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
export class Nutrient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
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

// TODO: move this into module or smth????
export async function getNutrientRepository(): Promise<Repository<Nutrient>> {
    if (connection === undefined) {
        connection = await createConnection({
            type: "mysql",
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [Nutrient],
        });
    }
    return connection.getRepository(Nutrient);
}
