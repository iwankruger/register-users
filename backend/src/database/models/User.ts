import { Sequelize, Model, DataTypes, BuildOptions, Optional, HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin } from 'sequelize';
import { Database } from '../Database';
import { Phone } from './Phone'

export interface UserAttributes {
    id: number;
    name: string;
    surname: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;

    phones?: Phone | Phone[]
};

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public surname!: string;
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    public getPhones!: HasManyGetAssociationsMixin<Phone>; // Note the null assertions!
    public addPhones!: HasManyAddAssociationMixin<Phone, number>;
    public hasPhones!: HasManyHasAssociationMixin<Phone, number>;
    public countPhones!: HasManyCountAssociationsMixin;
    public createPhones!: HasManyCreateAssociationMixin<Phone>;

    public readonly phones?: Phone[];

    public static associations: {
        phones: Association<User, Phone>;
    };
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
        surname: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        email: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        }
    },
    {
        tableName: 'Users',
        sequelize: Database.getInstance(), // passing the `sequelize` instance is required
    }
);

User.hasMany(Phone, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'phones' // this should match "phones: Association<User, Phone>;" in class User
});
