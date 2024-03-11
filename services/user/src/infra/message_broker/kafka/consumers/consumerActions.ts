import { User } from "../../../../entities/user.entity";
import { IUserInteractor } from "../../../../interfaces/interactor_interface/IUserinteractor";

export class ConsumerActions {
  private userInteractor: IUserInteractor;
  constructor(interactor: IUserInteractor) {
    this.userInteractor = interactor;
  }
  async addUser(data: User) {
    try {
      console.log(` ___ Add user consumer called ___`);
      const newUser = await this.userInteractor.addUserData(data);
      console.log("🚀 ~ ConsumerActions ~ addUser ~ newUser:", newUser);
    } catch (error) {
      console.log(` Err while running addUserconsumer ${error}`);
    }
  }

  async upudatePassword(data: { id: string; newPass: string }) {
    try {
      console.log(` _update pass consumer called _`);
      const newUser = await this.userInteractor.updatePassword(
        data.newPass,
        data.id
      );
    } catch (error) {
      console.log(` Err while running updatePass consumer ${error}`);
    }
  }
}