import { TransactionRepository } from "@/core/domain/transaction/repository/TransictionRepository";
import getPrismaInstance from "../../prisma/singletonPrisma";
import { Transaction } from "@/core/domain/transaction/entity/Transition";
import { TransactionPrismaMapper } from "../../prisma/mapper/TransactionPrismaMaper";

export class TransactionPrismaRepositoryi implements TransactionRepository {
    private readonly prisma = getPrismaInstance();

    async create(transaction: Transaction): Promise<Transaction> {
        const data = TransactionPrismaMapper.toDatabase(transaction);
        const result = await this.prisma.transaction.create({ data });
        return TransactionPrismaMapper.toDomain(result);
    }
}