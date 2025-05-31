import Entity from "../../../generics/Entity";
import Identity from "../../../generics/Identity";
import { Email } from "../object-value/Email";

type UserProps = {
    name: string;
    email: Email;
    password: string;
}

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

    set name(name: string) {
        this.props.name = name;
    }

    set email(email: Email) {
        this.props.email = email;
    }

    set password(password: string) {
        this.props.password = password;
    }
}