import { NotificaionConsumerActions } from "./consumers/consumerActions";

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "user" | "admin" | "company";
}

type SubscriberFunction = (verificatioData: string) => Promise<void>;
type SubscriberFunction2 = (data: {
  email: string;
  description: string;
}) => Promise<void>;

type forgotMailSubscriber = (link: string) => Promise<void>;
type GeneralSubscriberFunction =
  | SubscriberFunction
  | SubscriberFunction2
  | forgotMailSubscriber;
interface SubscriberActions {
  [key: string]: GeneralSubscriberFunction | undefined;
}
export const subscriber = (): SubscriberActions => {
  const consumerActions = new NotificaionConsumerActions();
  return {
    sendOtp: consumerActions.sendOtpforUser,
    sendRejectmailforCompany: consumerActions.sendRejectmailforCompany,
    sendForgotMail: consumerActions.sendForgotPassMail,
  };
};
