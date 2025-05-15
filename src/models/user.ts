export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  entries: number;
  joined: Date;
}

export let Users: User[] = [];

export let baseID = 100;
