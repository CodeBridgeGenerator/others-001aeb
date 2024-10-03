
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
firstName: faker.lorem.sentence(1),
lastName: faker.lorem.sentence(1),
age: faker.lorem.sentence(1),
dateOfBirth: faker.lorem.sentence(1),
address: faker.lorem.sentence(1),
emailAddress: faker.lorem.sentence(1),
gender: "Female",
mobileNumber: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
