import login from './services/login';
import register from './services/register';
import logout from './services/logout';
import getCurrentUser, { tokenExistsAndNotExpired } from './services/getCurrentUser';

export { login, logout, register, getCurrentUser, tokenExistsAndNotExpired };

export const ENDPOINT = '/Account';
export const LOCAL_STORAGE_NAME = 'user';

export const banner = require('./assets/banner.jpg');
