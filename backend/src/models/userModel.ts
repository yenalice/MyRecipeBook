import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    createConnection,
    Connection,
    Repository,
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column() // TODO: find out how to store safely :)
    password: string;

    @Column()
    dateCreated: Date;
}

let connection: Connection;

export async function getUserRepository(): Promise<Repository<User>> {
    if (connection === undefined) {
        connection = await createConnection({
            type: "sqlite",
            database: "myangularapp",
            synchronize: true,
            entities: [User],
        });
    }
    return connection.getRepository(User);
}
