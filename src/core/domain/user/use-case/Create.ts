import { BadRequest } from '@/shared/errors/custom/BadRequest';
import { Either, left, right } from '@/shared/utils/Either';
import { User } from '../entity/User';
import { Encrypter } from '@/shared/utils/Encrypter';
import { UserRepository } from '../repository/UserRepository';
import { Email } from '../object-value/Email';

type Request = {
  name: string;
  email: string;
  password: string;
};

type Response = Either<BadRequest, User>;

export class CreateUserUseCase {
  private encrypter: Encrypter;
  constructor(private readonly userRepository: UserRepository) {
    this.encrypter = new Encrypter();
  }

  async execute(props: Request): Promise<Response> {
    const { name, email, password } = props;

    const emailExist = await this.userRepository.findByEmail(email);
    if (emailExist) return left(new BadRequest('Email already exists.'));

    try {
      const passwordCrypted = await this.encrypter.hash(password);
      const emailValid = Email.create(email);
      const user = User.create({
        name,
        password: passwordCrypted,
        email: emailValid,
      });

      const createdUser = await this.userRepository.create(user);
      return right(createdUser);
    } catch (err) {
      if (err instanceof BadRequest) {
        return left(err);
      }
      throw new Error('Unexpected error while creating user.');
    }
  }
}
