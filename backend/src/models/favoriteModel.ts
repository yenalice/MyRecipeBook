import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    createConnection,
    Connection,
    Repository,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Recipe } from "./recipeModel";
import { User } from "./userModel";

require("dotenv").config();

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn({ type: "int" })
    favoriteId: number;

    @Column({ type: "int" })
    @ManyToOne((type) => User, (user) => user.userId)
    @JoinColumn({ name: "userId", referencedColumnName: "userId" })
    userId: number;

    @Column({ type: "int" })
    @ManyToOne((type) => Recipe, (recipe) => recipe.recipeId)
    @JoinColumn({ name: "recipeId", referencedColumnName: "recipeId" })
    recipeId: number;
}

let connection: Connection;

// TODO: move this into module or smth????
export async function getFavoriteRepository(): Promise<Repository<Favorite>> {
    if (connection === undefined) {
        connection = await createConnection({
            name: "userConnection",
            type: "mysql",
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            entities: [Favorite, User, Recipe],
        });
    }
    return connection.getRepository(Favorite);
}
