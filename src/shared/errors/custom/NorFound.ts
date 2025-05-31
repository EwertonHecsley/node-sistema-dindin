import { GenericErrors } from '../GenericError';

export class NotFound extends GenericErrors {
  constructor(message: string = 'Not Found') {
    super(message, 404);
    this.name = 'NotFound';
  }
}
