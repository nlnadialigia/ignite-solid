import { User } from "modules/users/model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const emailAlreadyExists = this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new Error("Email already exist");
    }

    if (email === "" || name ==="") {
      throw new Error("Field all the fields");
    }
    
    const user = this.usersRepository.create({ name, email });
    return user;
  }
}

export { CreateUserUseCase };
