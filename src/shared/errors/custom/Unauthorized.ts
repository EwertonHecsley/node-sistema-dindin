import { GenericErrors } from '../GenericError';

export class Unauthorized extends GenericErrors {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
    this.name = 'Unauthorized';
  }
}
