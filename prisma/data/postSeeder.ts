import range from "lodash/range";
import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

class PostSeed extends Seeder {
  constructor(count: number = 10) {
    super(count);
    this.count = count;
    this.createData();
  }

  createData() {
    range(this.count).forEach(() => {
      this._data.push({
        title: faker.lorem.sentence(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        content: faker.lorem.sentence(),
      });
    });
  }
}

export default PostSeed;
