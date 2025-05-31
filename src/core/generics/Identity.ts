import { randomUUID } from 'crypto';

export default class Identity {
    private value: string;

    constructor(value?: string) {
        this.value = value ?? randomUUID()
    }

    getValueId(): string {
        return this.value;
    }
}