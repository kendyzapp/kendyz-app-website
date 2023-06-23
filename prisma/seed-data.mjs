// @ts-check
import { faker } from "@faker-js/faker";

// @ts-check
import { hash } from "bcrypt";

export const categories = [
  {
    name: "Musique",
  },
  {
    name: "Restauration",
  },
  {
    name: "Spectacle",
  },
  {
    name: "Logistique",
  },
  {
    name: "Photographie",
  },
  {
    name: "Lieux",
  },
  {
    name: "Transport",
  },
];

export const users = Array.from({ length: 100 }).map(async (_, i) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: await hash("password", 10),
  image: faker.image.avatar(),
}));

const prestationNumber = 500;

export const prestations = Array.from({ length: prestationNumber }).map(
  async (_, i) => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.lorem.paragraphs(),
    categoryName: faker.helpers.arrayElement(categories).name,
    userId: (await faker.helpers.arrayElement(users)).id,
  })
);

export const prestationLikes = async () => {
  let prestationLikes = [];
  for (let i = 0; i < prestationNumber; i++) {
    const usersLikes = faker.helpers.arrayElements(users, { min: 0, max: 100 });
    for (const user of usersLikes) {
      prestationLikes.push({
        prestationId: (await prestations[i]).id,
        userId: (await user).id,
      });
    }
  }
  return prestationLikes;
};

export const bookings = prestations.flatMap((p) => {
  const usersBookings = faker.helpers.arrayElements(users, {
    min: 0,
    max: 50,
  });
  return usersBookings.map(async (u) => ({
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    prestationId: (await p).id,
    clientId: (await u).id,
    description: faker.lorem.paragraph(),
  }));
});

export const ratings = (await Promise.all(bookings))
  .filter((b) => b.date.getTime() < new Date().getTime())
  .map((b) => ({
    bookingId: b.id,
    value: faker.number.int({ min: 1, max: 5 }),
    content: faker.lorem.paragraph(),
  }));

const prestationNumberImages = 5;

export const images = Array.from({ length: prestationNumberImages }).flatMap(
  (_, i) =>
    Array.from({ length: prestationNumber }).map(async (_, j) => ({
      url: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
      prestationId: (await prestations[j]).id,
    }))
);
