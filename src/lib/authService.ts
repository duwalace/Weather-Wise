// src/lib/authService.ts
import { UserCredentials } from './types';

// Simulate API calls
const FAKE_DELAY = 500;

export const login = (credentials: UserCredentials): Promise<{ email: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email && credentials.password) {
        const user = { email: credentials.email };
        // In a real app, you'd get a token from the server
        localStorage.setItem('authToken', 'fake-jwt-token');
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, FAKE_DELAY);
  });
};

export const signup = (credentials: UserCredentials): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          // Simulate successful signup, but don't log them in automatically
          console.log(`User signed up with email: ${credentials.email}`);
          resolve();
        } else {
          reject(new Error('Email and password are required for signup'));
        }
      }, FAKE_DELAY);
    });
  };

export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
