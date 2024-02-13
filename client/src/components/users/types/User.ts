export type User = {
  id: number;
  name: string;
  email: string;
  message?: string;
};

export type UserId = User["id"];