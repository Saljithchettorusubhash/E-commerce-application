import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.shippingMethod.createMany({
    data:[
      {name:"Standard Shipping",price:5.99},
      {name:"Express Shipping",price:9.99},
      {name:"Overnight Shipping",price:19.99}

    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });