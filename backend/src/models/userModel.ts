import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    createConnection,
    Connection,
    Repository,
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: "int" })
    userId: number;

    @Column({ type: "varchar", length: 254 })
    email: string;

    @Column({ type: "varchar", length: 30 })
    username: string;

    @Column({ type: "varchar", length: 30 }) // TODO: find out how to store safely :)
    password: string;

    @CreateDateColumn({ type: "datetime" })
    dateCreated: Date;
}

let connection: Connection;

export async function getUserRepository(): Promise<Repository<User>> {
    if (connection === undefined) {
        connection = await createConnection({
            type: "mysql",
            username: "myrecipebook",
            password: "yummy!!",
            database: "myrecipebook",
            synchronize: true,
            entities: [User],
        });
    }
    return connection.getRepository(User);
}
