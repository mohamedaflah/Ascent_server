export interface sendPayloadType {
    email: string;
    otp: string;
    userData: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      role: "user" | "admin" | "company";
    };
  }