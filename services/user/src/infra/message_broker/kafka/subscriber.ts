import { User } from "../../../entities/user.entity";
import { UserInteractor } from "../../../interactors/userInteractor";
import { UserRepository } from "../../../repositories/userRepository";
import { ConsumerActions } from "./consumers/consumerActions";

type SubscriberFunction = (userDate: User) => Promise<void>;
type SubscriberActions2 = (data: {
  id: string;
  newPass: string;
}) => Promise<void>;
interface SubscriberActions {
  [key: string]: SubscriberFunction | SubscriberActions2 | undefined;
}
export const subscriber = (): SubscriberActions => {
  const repository = new UserRepository();
  const interactor = new UserInteractor(repository);
  const consumerAction = new ConsumerActions(interactor);
  return {
    addUser: consumerAction.addUser.bind(consumerAction),
    upudatePassword: consumerAction.upudatePassword.bind(consumerAction),
  };
};
