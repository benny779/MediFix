import { LOCAL_STORAGE_NAME } from '..';

const logout = () => localStorage.removeItem(LOCAL_STORAGE_NAME);

export default logout;
