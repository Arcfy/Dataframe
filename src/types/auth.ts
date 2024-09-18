/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface AuthState {
    ingame_name: string;
    access_token?: string;
    avatar: string;
  }
  
  export interface AppError extends Error {}