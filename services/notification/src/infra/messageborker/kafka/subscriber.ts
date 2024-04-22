import { InterviewMail } from "./consumers/InterviewMail";
import { Application } from "./consumers/applicantConsumer";
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

type sendApplicationMail = (data: {
  description: string;
  status: string;
  title: string;
  email: string;
}) => Promise<void>;
type sendInterviewMail = (data: {
  description: string;
  date: string;
  email: string;
  from?: "time" | "date";
}) => Promise<void>;

type sendVerificationOtp = (data: {
  tag: string;
  email: string;
}) => Promise<void>;

type GeneralSubscriberFunction =
  | SubscriberFunction
  | SubscriberFunction2
  | forgotMailSubscriber
  | sendApplicationMail
  | sendInterviewMail
  | sendVerificationOtp;
interface SubscriberActions {
  [key: string]: GeneralSubscriberFunction | undefined;
}
export const subscriber = (): SubscriberActions => {
  const consumerActions = new NotificaionConsumerActions();
  const applicationChange = new Application();
  const interviewMail = new InterviewMail();
  return {
    sendOtp: consumerActions.sendOtpforUser,
    sendRejectmailforCompany: consumerActions.sendRejectmailforCompany,
    sendForgotMail: consumerActions.sendForgotPassMail,
    sendApplicationmail: applicationChange.sendApplicationmail,
    sendInterviewMail: interviewMail.sendInterviewMail,
    sendVerificationOtp: consumerActions.sendVerificationOtp,
  };
};
