import { BadRequest } from '../../../../shared/errors/custom/BadRequest';
import { NotFound } from '../../../../shared/errors/custom/NorFound';
import { Either, left, right } from '../../../../shared/utils/Either';
import { Encrypter } from '../../../../shared/utils/Encrypter';
import { Email } from '../object-value/Email';
import { UserRepository } from '../repository/UserRepository';

type Request = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type Response = Either<NotFound | BadRequest, boolean>;

export class UpdateUserUseCase {
  private encrypter: Encrypter;

  constructor(private readonly userRepository: UserRepository) {
    this.encrypter = new Encrypter();
  }

  async execute(props: Partial<Request>): Promise<Response> {
    const { id, ...others } = props;

    if (!id) return left(new BadRequest(`ID cannot be empty or invalid.`));

    const userExist = await this.userRepository.findById(id);
    if (!userExist) return left(new NotFound(`User not found.`));

    if (others.email) {
      const emailExist = await this.userRepository.findByEmail(others.email);
      if (emailExist) return left(new BadRequest('Email already exists.'));
      try {
        const newEmail = Email.create(others.email);
        userExist.email = newEmail;
      } catch (err) {
        if (err instanceof BadRequest) {
          return left(err);
        }
        throw new Error('Unexpected error while creating user.');
      }
    }

    if (others.password) {
      const newPasswordEncrypted = await this.encrypter.hash(others.password);
      userExist.password = newPasswordEncrypted;
    }

    if (others.name) userExist.name = others.name;

    await this.userRepository.save(userExist);

    return right(true);
  }
}
