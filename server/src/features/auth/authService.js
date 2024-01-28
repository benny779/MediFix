import { error, success } from '../../helpers/responseHelper.js';

const db = [{ email: 'a@a.com', password: 'Aq123456', firstName: 'Benny', lastName: 'Shenk' }];

const login = (loginRequest) => {
  const { email, password } = loginRequest;

  const user = db.find((u) => u.email === email);

  if (!user) return error('User not found');

  if (password !== user.password) return error('Incorrect password');

  return success({ email, firstName: user.firstName, lastName: user.lastName });
};

export default { login };
