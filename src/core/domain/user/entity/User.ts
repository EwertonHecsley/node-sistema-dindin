import Entity from '@/core/generics/Entity';
import { Email } from '../object-value/Email';
import Identity from '@/core/generics/Identity';

type UserProps = {
  name: string;
  email: Email;
  password: string;
  createdAt?: Date
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: Identity) {
    super(props, id);
  }

  static create(props: UserProps, id?: Identity): User {
    return new User({ ...props }, id);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt!
  }

  set name(name: string) {
    this.props.name = name;
  }

  set email(email: Email) {
    this.props.email = email;
  }

  set password(password: string) {
    this.props.password = password;
  }

  set createdAt(date: Date) {
    this.props.createdAt = date;
  }
}
