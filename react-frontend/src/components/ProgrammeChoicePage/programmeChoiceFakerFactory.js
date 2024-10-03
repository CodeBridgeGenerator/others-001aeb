
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
intakeYear: faker.lorem.sentence(""),
courseName: faker.lorem.sentence(""),
month: faker.lorem.sentence(""),
campusLocation: faker.lorem.sentence(""),
mode: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
