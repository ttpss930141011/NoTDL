export interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  picture: string;
  access_token: string | null;
  refresh_token: string | null;
  is_active: boolean;
}

export interface AuthData {
  access_token: string;
  refresh_token: string;
  id_token: string;
}

export interface Id_Token {
  email?: string; // Some user may not have authorized to provide email and name.
  name?: string;
  picture: string;
  updated_at: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sub: string;
}

export type GetCurrentUser = () => Promise<User | null>;
