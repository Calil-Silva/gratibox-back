import faker from 'faker';
import RandExp from 'randexp';
import bcrypt from 'bcrypt';
import { regexPattern } from '../../src/schemas/regexPattern';

export const mockedUser = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: new RandExp(regexPattern('password')).gen(),
  confirmedPassword() {
    return this.password;
  },
  fakePassword() {
    return this.password.slice(-1);
  },
  hashedPassword() {
    return bcrypt.hashSync(this.password, 10);
  },
};
