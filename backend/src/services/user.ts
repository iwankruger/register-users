import { FindOptions } from 'sequelize';
import { User as UserModel, UserAttributes, UserCreationAttributes } from '../database/models/user';
import { Database } from '../database/Database'

interface SequelizeQuery {
    order?: [];
}

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

    public static async add(user: UserCreationAttributes): Promise<{}> {
        const t = await Database.getInstance().transaction();
        try {
            const result = await UserModel.create(user);
            return { result: true };

        } catch (error) {
            throw error;
        }
    }

}

export { User };