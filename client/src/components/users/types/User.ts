export type User = {
  id: number | undefined;
  name: string;
  email: string;
  password: string;
  image: string;
  message?: string;
};

export type UserId = User["id"];
