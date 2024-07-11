import type {AxiosResponse} from 'axios';
import axios from 'axios';
import url from 'url';
import {jwtDecode} from 'jwt-decode';
import type {AuthData, Id_Token, User} from '#shared/auth';
import {
  createUser,
  disableOtherUsers,
  getOneUserWithIsActive,
  getUserByUserId,
  updateUserByUserId,
} from '/@/database/repository/UserRepo';
import {safeStorage} from 'electron';
import {createAuthWindow, createLogoutWindow} from '/@/authWindow';


const apiIdentifier = import.meta.env.VITE_AUTH0_IDENTIFIER || '';
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN || '';
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || '';
const redirectUri = 'http://localhost/callback';

export const authenticationURL = `https://${auth0Domain}/authorize?audience=${apiIdentifier}&scope=openid profile email offline_access&response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

export const logOutURL = `https://${auth0Domain}/v2/logout`;

export const loadTokens = async (callbackURL: string): Promise<User> => {
  // Load and decode tokens after authentication redirect
  const urlParts = url.parse(callbackURL, true);
  const query = urlParts.query;
  const exchangeOptions = {
    grant_type: 'authorization_code',
    client_id: clientId,
    code: query.code,
    redirect_uri: redirectUri,
  };

  const options = {
    method: 'POST',
    url: `https://${auth0Domain}/oauth/token`,
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify(exchangeOptions),
  };

  try {
    const {data} = (await axios(options)) as AxiosResponse<AuthData>;
    const {id_token: idToken, access_token: accessToken, refresh_token: refreshToken} = data;
    const test = jwtDecode<Id_Token>(idToken);
    console.log('test:', test);
    const {email = '', name = 'User', picture, sub: user_id} = test;
    const encryptedToken = safeStorage.encryptString(accessToken).toString('latin1');
    const encryptedRefreshToken = safeStorage.encryptString(refreshToken).toString('latin1');
    let user = await getUserByUserId(user_id);
    if (!user) {
      user = await createUser({
        email,
        user_id,
        name,
        picture,
        access_token: encryptedToken,
        refresh_token: encryptedRefreshToken,
      });
    } else {
      user = await updateUserByUserId(user_id, {
        access_token: encryptedToken,
        refresh_token: encryptedRefreshToken,
        is_active: true,
      });
    }
    if (!user) throw new Error('Failed to load tokens.');
    await disableOtherUsers(user_id);
    return user;
  } catch (error) {
    console.error('Failed to load tokens:', error);
    await logout();
    throw error;
  }
};

export const refreshTokens = async () => {
  const currentUser = await getOneUserWithIsActive();
  if (!currentUser) return;

  const {refresh_token: encryptedRefreshToken} = currentUser;
  if (!encryptedRefreshToken) throw new Error('No available refresh token.');

  const refreshToken = safeStorage.decryptString(Buffer.from(encryptedRefreshToken, 'latin1'));
  if (refreshToken) {
    const refreshOptions = {
      method: 'POST',
      url: `https://${auth0Domain}/oauth/token`,
      headers: {'content-type': 'application/json'},
      data: {
        grant_type: 'refresh_token',
        client_id: clientId,
        refresh_token: refreshToken,
      },
    };

    try {
      const {data} = await axios(refreshOptions) as AxiosResponse<AuthData>;
      const {access_token: accessToken, id_token: idToken} = data;
      const encryptedToken = safeStorage.encryptString(accessToken).toString('latin1');
      const {sub: user_id} = jwtDecode<Id_Token>(idToken);
      const user = await updateUserByUserId(user_id, {access_token: encryptedToken});
      console.log('refreshed user:', user);
    } catch (error) {
      await logout();
      throw error;
    }
  } else {
    await logout();
  }
};

export const logout = async (): Promise<void> => {
  console.log('Logging out user...');
  const user = await getOneUserWithIsActive();
  if (user) await updateUserByUserId(user.user_id, {is_active: false, access_token: null, refresh_token: null});
};

export const userLoginService = async () => {
  await createAuthWindow();
  console.log('User login service');
};
export const userLogoutService = async () => {
  await createLogoutWindow();
  console.log('User logout service');
};
