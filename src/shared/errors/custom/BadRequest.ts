import { GenericErrors } from '../GenericError';

export class BadRequest extends GenericErrors {
  constructor(message: string = 'Bad Request') {
    super(message, 400);
    this.name = 'BadRequest';
  }
}
