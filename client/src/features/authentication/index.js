import login from './services/login';
import logout from './services/logout';
import getCurrentUser from './services/getCurrentUser';

export { login, logout, getCurrentUser };

export const ENDPOINT = '/auth';
export const LOCAL_STORAGE_NAME = 'user';

export const banner = require('./assets/banner.jpg');
