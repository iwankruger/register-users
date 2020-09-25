import { Model, DataTypes, Optional } from 'sequelize';
import { Database } from '../Database';

export interface PhoneAttributes {
    id: number;
    number: string;
    phoneTypeId: number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface PhoneCreationAttributes extends Optional<PhoneAttributes, 'id'> {}

export class Phone extends Model<PhoneAttributes, PhoneCreationAttributes> implements PhoneAttributes {
    public id!: number;
    public number!: string;
    public phoneTypeId!: number;
    public userId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Phone.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneTypeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    },
    {
        tableName: 'Phones',
        sequelize: Database.getInstance()
    }
);
