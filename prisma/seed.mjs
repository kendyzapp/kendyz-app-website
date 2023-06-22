// @ts-check
import { PrismaClient } from "@prisma/client";

// @ts-check
import { faker } from "@faker-js/faker";

// @ts-check
import {
  prestations,
  categories,
  images,
  users,
  prestationLikes,
  rates,
} from "./seed-data.mjs";

const prisma = new PrismaClient();

const deleteAll = async () => {
  try {
    await prisma.prestationImage.deleteMany();
    console.log("Deleted all images");

    await prisma.prestationLike.deleteMany();
    console.log("Deleted all prestation likes");

    await prisma.prestation.deleteMany();
    console.log("Deleted all prestations");

    await prisma.category.deleteMany();
    console.log("Deleted all categories");

    await prisma.user.deleteMany();
    console.log("Deleted all users");

    await prisma.rate.deleteMany();
    console.log("Deleted all rates");
  } catch (error) {
    console.error(error);
  }
};

const createAll = async () => {
  try {
    const usersCreated = await prisma.user.createMany({
      data: users,
    });
    console.log(`Created ${usersCreated.count} users`);

    const categoriesCreated = await prisma.category.createMany({
      data: categories,
    });
    console.log(`Created ${categoriesCreated.count} categories`);

    const prestationsCreated = await prisma.prestation.createMany({
      data: prestations,
    });
    await prisma.$executeRaw`UPDATE prestations SET coordinates = ST_SetSRID(ST_MakePoint(${faker.location.longitude(
      {
        min: -4.797,
        max: 9.56,
      }
    )}, ${faker.location.latitude({
      min: 41.3333,
      max: 51.0892,
    })}), 4326)`;
    console.log(`Created ${prestationsCreated.count} prestations`);

    const imagesCreated = await prisma.prestationImage.createMany({
      data: images,
    });
    console.log(`Created ${imagesCreated.count} images`);

    const prestationLikesCreated = await prisma.prestationLike.createMany({
      data: prestationLikes(),
    });
    console.log(`Created ${prestationLikesCreated.count} prestation likes`);

    const ratesCreated = await prisma.rate.createMany({
      data: rates(),
    });
    console.log(`Created ${ratesCreated.count} rates`);
  } catch (error) {
    console.error(error);
  }
};
const load = async () => {
  try {
    await deleteAll();
    await createAll();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

await load();
