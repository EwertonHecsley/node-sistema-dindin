import { Either } from "../../../../shared/utils/Either";
import { User } from "../entity/User";

type Response = Either<null, User[]>;

export class ListAllUserUseCase { }