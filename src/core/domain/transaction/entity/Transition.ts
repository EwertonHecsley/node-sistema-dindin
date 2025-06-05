import Entity from "@/core/generics/Entity";

type PropsTransition = {
    description: string;
    value: number;
    date: Date;
    category_id: string;
    user_id: string;
    type: string
}

export class Transition extends Entity<PropsTransition> { }