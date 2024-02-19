import { LOCAL_STORAGE_NAME } from '..';

const getCurrentUser = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));

export default getCurrentUser;
