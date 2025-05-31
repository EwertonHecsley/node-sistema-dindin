import { BadRequest } from '../../../../shared/errors/custom/BadRequest';

export class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    if (!this.isValidEmail(value)) {
      throw new BadRequest('Invalid email format');
    }
    return new Email(value);
  }

  private static isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  getValueEmail(): string {
    return this.value;
  }
}
