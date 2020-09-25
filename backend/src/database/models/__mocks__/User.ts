export class User {
    static databaseResult = [
        {
            id: 1,
            name: 'Test',
            surname: 'Mock',
            email: 'test@mock.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            phones: [
                {
                    id: 1,
                    number: '123',
                    phoneTypeId: 1,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
        },
        {
            id: 2,
            name: 'Test2',
            surname: 'Mock2',
            email: 'test2@mock.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            phones: [
                {
                    id: 2,
                    number: '222',
                    phoneTypeId: 1,
                    userId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
        },
    ];

    static associations = { phones: 'mock' };

    public static findAll(query: any): Promise<any> {
        if (query.where && query.where.id) {
            // return only one mock data item if id is provided
            return Promise.resolve([User.databaseResult[0]]);
        } else {
            // return all mock data
            return Promise.resolve(User.databaseResult);
        }
    }
}
