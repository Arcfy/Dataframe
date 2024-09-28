// /* eslint-disable @typescript-eslint/no-unused-vars */
import Cookies from 'js-cookie';
import { AuthState, AppError } from '../types/auth';

const WFM_API = 'https://api.warframe.market/v1';

export class AuthModule {
  static async login(email: string, password: string): Promise<AuthState> {
    const url = `${WFM_API}/auth/signin`;

    const body = {
      email,
      password,
      auth_type : "header",
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; utf-8', 
          'Accept': 'application/json', 
          'Authorization': 'JWT', 
          'platform': 'pc', 
          'language': 'en', 
        },
        body: JSON.stringify(body),
        credentials: 'include', // Sending cookies
      });

      if (response.ok) {
        // Assuming the API returns AuthState in the response body
        const user: AuthState = await response.json();

        // JWT token
        if (user.access_token) {
          // (secure, sameSite)
          Cookies.set('token', user.access_token, { expires: 7, path: '/' });
        }

        return user;
      } else {
        let errorMessage = 'There was an error logging in';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
        }

        throw new Error(errorMessage) as AppError;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error as AppError;
      } else {
        throw new Error('An unexpected error occurred') as AppError;
      }
    }
  }
}
