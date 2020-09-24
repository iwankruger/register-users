import { Sequelize } from 'sequelize';
import databaseConfig from '../databaseConfig.json'
const env = process.env.NODE_ENV || 'development';
const config: any = databaseConfig[env as keyof typeof databaseConfig];

export class Database {
    private static instance: Sequelize;
    public static models: any;

    static getInstance(): Sequelize {
        if (!Database.instance) {
            Database.instance = new Sequelize(config.database, config.username, config.password, config);;
        }

        return Database.instance;
    }
}



