import axios from "axios";
import type { User } from "../components/users/types/User";
import { AuthAuthoriza, AuthReg } from "../components/auth/types/AuthState";

export const registrationAxios = async (value: AuthReg): Promise<User> => {
  const { data }: { data: User } = await axios.post("/api/auth/sign-up", {
    data: value,
  });
  if (!data.message) {
    return data;
  }
  throw new Error(data.message);
};

export const authorizationAxios = async (
  value: AuthAuthoriza,
): Promise<User> => {
  const { data }: { data: User } = await axios.post("/api/auth/sign-in", {
    data: value,
  });
  if (!data.message) {
    return data;
  }
  throw new Error(data.message);
};

export const checkAuthAxios = async (): Promise<User> => {
  const { data }: { data: { user: User } } = await axios.get("/api/auth/check");
  return data.user;
};

export const logOutAxios = async (): Promise<void> => {
  try {
    await axios.get("/api/auth/logout");
  } catch (error) {
    console.log(error);
  }
};
