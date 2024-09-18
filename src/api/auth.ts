/* eslint-disable @typescript-eslint/no-unused-vars */
import Cookies from 'js-cookie';
import { AuthState, AppError } from '../types/auth';

const API_BASE_URL = 'https://api.warframe.market/v1'; // Replace with your actual API base URL

export class AuthModule {
  // You can add more methods (e.g., logout, register) as needed

  /**
   * Logs in a user with the provided email and password.
   * @param email User's email address.
   * @param password User's password.
   * @returns AuthState on successful login.
   * @throws AppError on failure.
   */
  static async login(email: string, password: string): Promise<AuthState> {
    const url = `${API_BASE_URL}/auth/signin`;

    const body = {
      email,
      password,
      auth_type : "header",
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include', // Important for sending cookies
      });

      if (response.ok) {
        // Assuming the API returns AuthState in the response body
        const user: AuthState = await response.json();

        // Handle JWT token
        if (user.access_token) {
          // Store JWT token in a cookie
          // Adjust options as needed (e.g., secure, sameSite)
          Cookies.set('token', user.access_token, { expires: 7, path: '/' });
        }

        // Optionally, handle other headers if needed
        // For example, you can extract additional headers like 'set-cookie' if necessary

        return user;
      } else {
        // Attempt to parse error message from response
        let errorMessage = 'There was an error logging in';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, keep the default error message
        }

        throw new Error(errorMessage) as AppError;
      }
    } catch (error) {
      // Handle network or other unexpected errors
      if (error instanceof Error) {
        throw error as AppError;
      } else {
        throw new Error('An unexpected error occurred') as AppError;
      }
    }
  }
}