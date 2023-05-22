import { redirect } from "next/navigation";
import prisma from "../lib/prisma";
import { fakerFR as faker } from "@faker-js/faker";

export const createPrestation = async () => {
  const category = faker.commerce.department();
  await prisma.prestation.create({
    data: {
      status: "PUBLISHED",
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.urlLoremFlickr({ category: category }),
      category: {
        connectOrCreate: {
          where: {
            name: category,
          },
          create: {
            name: category,
          },
        },
      },
      organizationId: faker.string.uuid(),
      services: {
        create: [
          {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
          },
          {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
          },
        ],
      },
    },
  });
  redirect("/prestations");
};

const main = async () => {
  for (let i = 0; i < 10; i++) {
    await createPrestation();
  }
};

main();
