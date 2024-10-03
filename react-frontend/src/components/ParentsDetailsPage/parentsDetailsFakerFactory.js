
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
parentsFirstName: faker.lorem.sentence(1),
parentsLastName: faker.lorem.sentence(1),
address: faker.lorem.sentence(1),
homePhone: faker.lorem.sentence(1),
mobilePhone: faker.lorem.sentence(1),
parentsEmailAdd: faker.lorem.sentence(1),
employment: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
