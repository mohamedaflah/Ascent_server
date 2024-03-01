import { NotificaionConsumerActions } from "./consumers/consumerActions";

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "user" | "admin" | "company";
}

type SubscriberFunction = (verificatioData: string) => Promise<void>;

interface SubscriberActions {
  [key: string]: SubscriberFunction | undefined;
}
export const subscriber = ():SubscriberActions => {
  const consumerActions = new NotificaionConsumerActions();
  return {
    sendOtp: consumerActions.sendOtpforUser,
  };
};
