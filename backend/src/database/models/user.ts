import { Sequelize, Model, DataTypes, BuildOptions, Optional } from 'sequelize';
import { Database } from '../Database';

export interface UserAttributes {
    id: number;
    name: string;
    // createdAt?: Date;
    // updatedAt?: Date;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}



User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        // surname: {
        //   type: new DataTypes.STRING(128),
        //   allowNull: false,
        // }
    },
    {
        tableName: 'Users',
        sequelize: Database.getInstance(), // passing the `sequelize` instance is required
    }
);
