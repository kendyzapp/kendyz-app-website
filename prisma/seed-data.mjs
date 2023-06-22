// @ts-check
import { faker } from "@faker-js/faker";

// @ts-check
import { getPlaiceholder } from "plaiceholder";

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

export const users = Array.from({ length: 500 }).map((_, i) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  emailVerified: faker.helpers.maybe(faker.date.past),
  image: faker.image.avatar(),
}));

const prestationNumber = 1000;

export const prestations = Array.from({ length: prestationNumber }).map(
  (_, i) => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.lorem.paragraphs(),
    categoryName: faker.helpers.arrayElement(categories).name,
    userId: faker.helpers.arrayElement(users).id,
  })
);

export const prestationLikes = () => {
  let prestationLikes = [];
  for (let i = 0; i < prestationNumber; i++) {
    const usersLikes = faker.helpers.arrayElements(users, { min: 0, max: 100 });
    for (const user of usersLikes) {
      prestationLikes.push({
        prestationId: prestations[i].id,
        userId: user.id,
      });
    }
  }
  return prestationLikes;
};

export const rates = () => {
  let rates = [];
  for (let i = 0; i < prestationNumber; i++) {
    const usersRates = faker.helpers.arrayElements(users, { min: 0, max: 100 });
    for (const user of usersRates) {
      rates.push({
        prestationId: prestations[i].id,
        userId: user.id,
        value: faker.number.int({ min: 1, max: 5 }),
        description: faker.lorem.paragraph(),
      });
    }
  }
  return rates;
};

const prestationNumberImages = 5;

export const images = Array.from({ length: prestationNumberImages }).flatMap(
  (_, i) =>
    Array.from({ length: prestationNumber }).map((_, j) => ({
      url: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
      prestationId: prestations[j].id,
    }))
);
