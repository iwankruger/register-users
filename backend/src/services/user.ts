//import Model from '../../models';
import { UserAttributes, User as UserModel } from '../database/models/user';

interface SequelizeQuery {
    order?: [];
}

class User {

    public static async get(id: number | null, limit: number | null, offset: number | null) {
        try {
            // construct query
            const query = {
                order: [
                    ['name', 'ASC']
                ]
            };
            // if (id && !isNaN(id)) { id = Number(id); query['where'] = {id}; }
            // if (offset && !isNaN(offset)) {offset = Number(offset); query['offset'] = offset; }
            // if (limit && !isNaN(limit)) {limit = Number(limit); query['limit'] = limit; }

            // const users = await Model.User.findAll(query);
            UserModel.findAll<UserModel>().then((items: UserModel[]) => {
                console.log('find find find find find  ', items[0].getDataValue);
            }).catch((error: any) => {
                console.log('catch ', error);
            })

        } catch (error) {

        }
    }

}

export default User;