export type Party = {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
};

export type PartiesState = {
  parties: Party[];
};
// export type UserId = User["id"];
