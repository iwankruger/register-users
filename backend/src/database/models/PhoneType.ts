import { Model, DataTypes, Optional } from 'sequelize';
import { Database } from '../Database';

export interface PhoneTypeAttributes {
    id: number;
    type: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface PhoneTypeCreationAttributes extends Optional<PhoneTypeAttributes, 'id'> {}

export class PhoneType extends Model<PhoneTypeAttributes, PhoneTypeCreationAttributes> implements PhoneTypeAttributes {
    public id!: number;
    public type!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PhoneType.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'PhoneTypes',
        sequelize: Database.getInstance()
    }
);
