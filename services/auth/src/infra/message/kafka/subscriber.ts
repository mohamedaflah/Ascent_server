import { Otp } from "../../../entities/OtpEntity";
import { AuthServiceConsumerActions } from "./consumers/consumerAction";

type SubscriberFunction = (otp: Otp) => Promise<any | void>;

interface SubscriberActions {
  [key: string]: SubscriberFunction | undefined;
}
export const subscriber = (): SubscriberActions => {
  const consumerActions = new AuthServiceConsumerActions();
  return {
    signup_user: consumerActions.signupConsumer,
  };
};
