import { CompanyUseCase } from "../../../../application/useCases/companyUseCase";
import { UserUseCase } from "../../../../application/useCases/userUseCase";
import { Company } from "../../../../domain/entities/company.entity";
import { User } from "../../../../domain/entities/user.entity";
import { CompanyRepository } from "../../../../repositories/companyRepository";
import { UserRepository } from "../../../../repositories/userRepository";
import { CompanyAddConsumer } from "../consumer/consumerActions/AddCompany";
import { UserAddConsumer } from "../consumer/consumerActions/AddUser";
import { UserUpdateConsumer } from "../consumer/consumerActions/UpdateUser";

type AddCompany = (data: Company) => Promise<void>;
type AddUser = (data: User) => Promise<void>;
type UpdateUser = (body: { user: User; id: string }) => Promise<void>;
interface SubscriberActions {
  [key: string]: AddCompany | AddUser | UpdateUser;
}

export const subscriber = (): SubscriberActions => {
  const userRepo = new UserRepository();
  const userUseCase = new UserUseCase(userRepo);

  const userAddConsumer = new UserAddConsumer(userUseCase);
  const userUpdateConsumer = new UserUpdateConsumer(userUseCase);
  //   company
  const companyRepo = new CompanyRepository();
  const companyUsecase = new CompanyUseCase(companyRepo);
  const companyAddConsumer = new CompanyAddConsumer(companyUsecase);

  return {
    add_company: companyAddConsumer.addCompany.bind(companyAddConsumer),
    add_user: userAddConsumer.addUser.bind(userAddConsumer),
    update_user: userUpdateConsumer.updateUser.bind(userUpdateConsumer),
  };
};
