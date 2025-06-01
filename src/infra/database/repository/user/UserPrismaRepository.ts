import { UserRepository } from "@/core/domain/user/repository/UserRepository";
import getPrismaInstance from "../../prisma/singletonPrisma";
import { User } from "@/core/domain/user/entity/User";

export class UserPrismaRepository implements UserRepository {
    private prisma = getPrismaInstance();

    async create(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    save(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}