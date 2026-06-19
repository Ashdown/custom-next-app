import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});

const thingsData: Prisma.ThingCreateInput[] = [
  {
    name: "Christmas Thing",
    createdAt: new Date('2025-12-01')
  },
  {
    name: "New Year Thing",
    createdAt: new Date('2026-01-01')
  }
]

async function main() {
  for(const dataItem of thingsData) {
    await prisma.thing.create({ data: dataItem})
  }
}

main();
