import { PrismaClient } from "../../../../generated/prisma";

export default class PrismaService extends PrismaClient {
    async connect() {
        await this.$connect();
    }

    async disconnect() {
        await this.$disconnect();
    }
}