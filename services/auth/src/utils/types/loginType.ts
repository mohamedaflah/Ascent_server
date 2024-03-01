export type LoginBody = {
  email: string;
  password: string;
};
export type payload = {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role: "user" | "admin" | "company";
};