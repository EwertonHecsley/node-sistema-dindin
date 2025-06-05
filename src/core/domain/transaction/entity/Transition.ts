import Entity from '@/core/generics/Entity';
import Identity from '@/core/generics/Identity';
import { TransactionType } from '../../../../../generated/prisma';

type PropsTransition = {
  description: string;
  value: number;
  date: Date;
  category_id: string;
  user_id: string;
  type: TransactionType;
  createdAt?: Date;
};

export class Transaction extends Entity<PropsTransition> {
  private constructor(props: PropsTransition, id?: Identity) {
    super(props, id);
  }

  static create(props: PropsTransition, id?: Identity): Transaction {
    return new Transaction({ ...props, createdAt: props.createdAt ?? new Date() }, id);
  }

  get description(): string {
    return this.props.description;
  }

  get value(): number {
    return this.props.value;
  }

  get date(): Date {
    return this.props.date;
  }

  get category_id(): string {
    return this.props.category_id;
  }

  get user_id(): string {
    return this.props.user_id;
  }

  get type(): TransactionType {
    return this.props.type;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set value(value: number) {
    this.props.value = value;
  }

  set date(date: Date) {
    this.props.date = date;
  }
}
