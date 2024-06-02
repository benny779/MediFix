import { LOCAL_STORAGE_NAME } from '..';

const getCurrentUser = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));

export const tokenExistsAndNotExpired = () => {
  const user = getCurrentUser();

  if (!user?.accessToken) {
    return false;
  }

  console.log(user.exp);
  const nowUnix = Math.floor(new Date().getTime() / 1000);
  console.log(nowUnix);

  return user.exp > nowUnix;
};

export default getCurrentUser;
