import { FindOptions } from 'sequelize';
import { 
    User as UserModel, 
    UserAttributes, 
    UserCreationAttributes,
    Phone as PhoneModel
 } from '../database/models';
import { Database } from '../database/Database'

export interface UserGetInterface {
    users: UserModel[];
    limit?: number;
    offset?: number;
    totalRecords: number;
};

class User {

    public static async get(id?: number | null, limit?: number | null, offset?: number | null): Promise<UserGetInterface> {

        try {
            // construct query
            const query: FindOptions = {
                order: [
                    ['name', 'ASC']
                ],
                include: [UserModel.associations.phones]
            };
            if (id && !isNaN(id)) { id = Number(id); query.where = {id}; }
            if (offset && !isNaN(offset)) {offset = Number(offset); query.offset = offset; }
            if (limit && !isNaN(limit)) {limit = Number(limit); query.limit = limit; }

            const users = await UserModel.findAll(query);
            const totalRecords = await Database.getInstance().query(`SELECT COUNT(id) as 'count' FROM Users`);

            if (!totalRecords || !Array.isArray(totalRecords) || !Array.isArray(totalRecords[0])) {
                throw new Error('Total amount of records could not be retrieved from database');
            }

            let replyData: UserGetInterface = {
                users,
                totalRecords: totalRecords[0][0].count
            };

            if (limit) replyData = {...replyData, limit };
            if (offset) replyData = {...replyData, offset };

            console.log('count ', totalRecords[0][0].count);

            return replyData;
            // const c = await users[0].countPhones();
            // const p = await users[0].getPhones();
            // UserModel.findAll().then((items: UserModel[]) => {
            //     console.log('find find find find find  ', items);
            //     console.log('item  ', items[0].getDataValue('id'));
            //     console.log('item  ', items[0].id);
            //     console.log('item  ', items[0]);
            //     // return res.send(items);
            // }).catch((error: any) => {
            //     console.log('catch ', error);
            // })

        } catch (error) {
            return Promise.reject(error);
        }
    }

    public static async save(user: UserCreationAttributes): Promise<boolean> {
        const t = await Database.getInstance().transaction();
        try {
            // create or update user
            if (user.id) {
                // update user
                const result = await UserModel.update(user, { where: { id: user.id }, transaction: t });

                // check result
                if (!result || !Array.isArray(result) || result[0] === 0) {
                    throw new Error('Unsuccessful update');
                }

            } else {
                // create new user
                const userNew: UserModel = await UserModel.create(user, { transaction: t });
                console.log('new user ',userNew);
            }

            await t.commit();

            return true;

        } catch (error) {
            return Promise.reject(error);
        }
    }

    public static async delete(id: number): Promise<boolean> {
        const t = await Database.getInstance().transaction();
        try {
            const result = await UserModel.destroy({ where: { id }, transaction: t });
            // check if the user is deleted
            if (result === 0) return false;

            await t.commit();
            return true;
        } catch (error) {
            return Promise.reject(error);
        }
    }

}

export { User };