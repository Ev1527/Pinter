import type { User } from "../../users/types/User";

export type AuthState = {
  user: User | undefined;
  error: string | undefined;
  pending: boolean;
};

export type AuthReg = {
  name: string;
  email: string;
  password: string;
};
export type AuthAuthoriza = Omit<AuthReg, "name">;
