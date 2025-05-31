import Entity from "../../../generics/Entity";
import Identity from "../../../generics/Identity";

type UserProps = {
    name: string;
    email: string;
    password: string;
}

export class User extends Entity<UserProps> {
    private constructor(props: UserProps, id?: Identity) {
        super(props, id);
    }

    static create(props: UserProps, id?: Identity): User {
        return new User({ ...props }, id);
    }

    getName(): string {
        return this.props.name;
    }

    getEmail(): string {
        return this.props.email;
    }

    getPassword(): string {
        return this.props.password;
    }
}