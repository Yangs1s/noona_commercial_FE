export interface User {
  _id: string;
  email: string;
  name: string;
  address: string;
  phone: string;
  level: "customer" | "admin";
}

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  navigate: (path: string) => void;
}

export interface LoginPayload {
  email: string;
  password: string;
}
