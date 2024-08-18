import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

export type Role = {
  _id?: string;
  key?: string;
  name?: string;
};

export interface User {
  _id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | Role;
  username?: string;
  password?: string;
  type?: string;
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: User & DefaultJWT['user'];
    access_token: string;
    expires_at: number;
    refresh_token: string;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & DefaultSession['user'];
    access_token: string;
    refresh_token: string;
  }
}
