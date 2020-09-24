import { FindOptions } from 'sequelize';
import { User as UserModel, UserAttributes, UserCreationAttributes } from '../database/models/user';
import { Database } from '../database/Database'

class User {

    public static async get(id?: number | null, limit?: number | null, offset?: number | null): Promise<UserModel[]> {
        try {
            // construct query
            const query: FindOptions = {
                order: [
                    ['name', 'ASC']
                ]
            };
            if (id && !isNaN(id)) { id = Number(id); query.where = {id}; }
            if (offset && !isNaN(offset)) {offset = Number(offset); query.offset = offset; }
            if (limit && !isNaN(limit)) {limit = Number(limit); query.limit = limit; }

            const users: UserModel[] = await UserModel.findAll(query);

            return users;
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