import { UserUserCase } from "../../../../application/useCases/UserUsecase";
import { CompanyUseCase } from "../../../../application/useCases/companyUseCase";
import { Company } from "../../../../domain/entities/CompanyEntity";
import { User } from "../../../../domain/entities/User.entity";
import { CompanyRepository } from "../../../../repositories/companyRepository";
import { UserRepository } from "../../../../repositories/userRepository";
import { ConsumerActions } from "../consumers/actions/ConsumerAction";
import { UserConsumerAction } from "../consumers/actions/UserConsumerAction";

type AddCompany = (data: Company) => Promise<void>;
type AddUser = (data: User) => Promise<void>;
interface SubscriberActions {
  [key: string]: AddCompany | AddUser | undefined;
}

export const subscriber = (): SubscriberActions => {
  const repository = new CompanyRepository();
  const useCase = new CompanyUseCase(repository);
  const consumerActions = new ConsumerActions(useCase);

  // user
  const userRepo = new UserRepository();
  const userUsecase = new UserUserCase(userRepo);
  const userConsumer = new UserConsumerAction(userUsecase);
  return {
    add_company: consumerActions.addCompany.bind(consumerActions),
    add_user: userConsumer.addUser.bind(userConsumer),
  };
};
