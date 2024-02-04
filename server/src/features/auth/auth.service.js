import { badRequest, created, error, success, unauthorized } from '../../helpers/responseHelper.js';
import bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { generateToken } from '../../helpers/tokenHandler.js';
import DB from '../../dbConnection.js';
import { generateUuid } from '../../helpers/uuidHelper.js';

const SaltRounds = 10;

const insertUser = async (userDetails) => {
  const uuid = generateUuid();

  const [result] = await DB.execute(
    `
  INSERT INTO users 
  (user_id, first_name, last_name, email, password, phone)
  VALUES (?, ?, ?, ?, ?, ?)
  `,
    [uuid, userDetails.firstName, userDetails.lastName, userDetails.email, userDetails.password, userDetails.phone]
  );

  return result.insertId;
};

const getUserByEmail = async (email) => {
  const [rows] = await DB.execute('SELECT `user_id`, `email`, `password` FROM users WHERE `email` = ?', [email]);
  return rows;
};

const insertRefreshToken = async (userId, password) => {
  return await DB.execute('INSERT INTO `refresh_tokens` (`user_id`, `token`) VALUES (?, ?)', [userId, password]);
};

const register = async (userDetails) => {
  try {
    // check if user already exists
    const userExists = await getUserByEmail(userDetails.email);

    if (userExists.length > 0) {
      return badRequest('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userDetails.password, SaltRounds);

    userDetails = { ...userDetails, password: hashedPassword };

    const insertedUser = await insertUser(userDetails);

    return insertedUser ? created({ userId: insertedUser }) : error('Error while creating the user');
  } catch (err) {
    return error(err.message);
  }
};

const login = async (email, password) => {
  try {
    const userResult = await getUserByEmail(email);

    if (userResult.length === 0) {
      return badRequest('User not found.');
    }

    const user = userResult[0];

    const isPasswordVerified = await bcrypt.compare(password, user.password);

    if (!isPasswordVerified) {
      return unauthorized('Incorrect password.');
    }

    const accessToken = generateToken({ id: user.user_id });
    const refreshToken = generateToken({ id: user.user_id }, false);

    const hashedPassword = createHash('sha256').update(refreshToken).digest('hex');

    const [refTokenResult] = await insertRefreshToken(user.user_id, hashedPassword);

    if (!refTokenResult.affectedRows) {
      return error('Failed to white list the refresh token.');
    }

    return success({ accessToken, refreshToken });
  } catch (err) {
    return error(err.message);
  }
};

export default { register, login };
