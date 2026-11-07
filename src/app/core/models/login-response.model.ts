export interface LoginResponse {
  token: string;
  userId: string;
  email: string;
  userName: string;
  roles: string[];
  expiresAt: string;
}