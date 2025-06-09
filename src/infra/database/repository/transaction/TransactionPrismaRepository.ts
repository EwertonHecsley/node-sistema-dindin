import { TransactionRepository } from '@/core/domain/transaction/repository/TransictionRepository';
import getPrismaInstance from '../../prisma/singletonPrisma';
import { Transaction } from '@/core/domain/transaction/entity/Transition';
import { TransactionPrismaMapper } from '../../prisma/mapper/TransactionPrismaMaper';

export class TransactionPrismaRepositoryi implements TransactionRepository {
  private readonly prisma = getPrismaInstance();

  async create(transaction: Transaction): Promise<Transaction> {
    const data = TransactionPrismaMapper.toDatabase(transaction);
    const result = await this.prisma.transaction.create({ data });
    return TransactionPrismaMapper.toDomain(result);
  }

  async list(id: string): Promise<Transaction[]> {
    const result = await this.prisma.transaction.findMany({ where: { user_id: id } });
    return result.map(TransactionPrismaMapper.toDomain);
  }

  async findById(id: string, user_id: string): Promise<Transaction | null> {
    const result = await this.prisma.transaction.findFirst({
      where: { id, user_id },
    });

    return result ? TransactionPrismaMapper.toDomain(result) : null;
  }

  async save(entity: Transaction): Promise<void> {
    const data = TransactionPrismaMapper.toDatabase(entity);
    await this.prisma.transaction.update({
      where: { id: entity.getValueId().getValueId(), user_id: entity.user_id },
      data,
    });
  }

  async delete(id: string, user_id: string): Promise<void> {
    await this.prisma.transaction.delete({
      where: { id, user_id },
    });
  }
}
