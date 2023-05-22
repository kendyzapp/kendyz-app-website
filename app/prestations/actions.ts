"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import { auth } from "@clerk/nextjs";
import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { faker } from "@faker-js/faker";

export const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const createCategory = async (formData: FormData) => {
  const data = z
    .object({
      name: z.string().min(3).max(255),
    })
    .parse(Object.fromEntries(formData));
  await prisma.category.create({
    data: data,
  });
  revalidatePath(`/prestations`);
};

export const getPrestation = async (prestationId: string) => {
  const prestation = await prisma.prestation.findUniqueOrThrow({
    where: { id: prestationId },
    include: { category: true },
  });
  return prestation;
};

export const getPrestations = async () => {
  const prestations = await prisma.prestation.findMany();
  return prestations;
};

export const searchCategoryPrestations = async (categoryName?: string, search?: string) => {
  const prestations = await prisma.prestation.findMany({
    where: {
      category: {
        name: categoryName,
      },
      name: {
        search: search,
        mode: "insensitive",
      },
      description: {
        search: search,
        mode: "insensitive",
      },
      services: {
        some: {
          name: {
            search: search,
            mode: "insensitive",
          },
        },
      },
    },
  });
  redirect(`/prestations/${categoryName}?query=${search}`);
};

const searchCategoryPrestationsFormData = z.object({
  categoryName: z.string().optional(),
  query: z.string().optional(),
});

export const searchCategoryPrestationsRedirect = async (formData: FormData) => {
  const validatedData = searchCategoryPrestationsFormData.parse(Object.fromEntries(formData));
  redirect(`/prestations/${validatedData.categoryName}${validatedData.query && "?query=" + validatedData.query}`);
};

const PrestationNewFormData = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  categoryId: z.string().uuid(),
});

export const createPrestation = async (formData: FormData) => {
  const organizationId = auth().orgId;
  if (!organizationId) throw new Error("No organization found");
  const validatedData = PrestationNewFormData.parse(Object.fromEntries(formData));
  const prestation = await prisma.prestation.create({
    data: {
      ...validatedData,
      image: "https://flicker.com/400/400/animals",
      organizationId: organizationId,
    },
  });
  redirect(`/prestations/${prestation.id}`);
};

export const deletePrestation = async (formData: FormData) => {
  const id = z.string().uuid().parse(formData.get("delete"));
  await prisma.prestation.delete({
    where: { id: id },
  });
  redirect(`/prestations`);
};

const PrestationBookFormData = zfd.formData({
  datetime: z.coerce.date(),
  description: z.string().min(3).max(255).optional(),
  prestationId: z.string().uuid(),
});

export const bookPrestation = async (formData: FormData) => {
  const userId = auth().userId;
  const validatedData = PrestationBookFormData.parse(Object.fromEntries(formData));
  const services = formData.getAll("services") as string[];
  if (!userId) redirect(`/signin?redirect=/prestations/${validatedData.prestationId}/book`);
  const booking = await prisma.booking.create<Prisma.BookingCreateArgs>({
    data: {
      ...validatedData,
      clientId: userId,
      services: {
        connect: services.map((serviceId) => ({ id: serviceId })),
      },
    },
  });
  redirect(`/bookings/${booking.id}`);
};

export const getPrestationServices = async (prestationId: string) => {
  const prestation = await prisma.prestation.findUniqueOrThrow({
    where: { id: prestationId },
    include: { category: true, services: true },
  });
  return prestation;
};

const PrestationServiceNewFormData = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  prestationId: z.string().uuid(),
});

export const createPrestationService = async (formData: FormData) => {
  const validatedData = PrestationServiceNewFormData.parse(Object.fromEntries(formData));
  await prisma.service.create({
    data: validatedData,
  });
  redirect(`/prestations/${validatedData.prestationId}`);
};

const ServiceDeleteFormData = z.object({
  serviceId: z.string().uuid(),
});

export const deleteService = async (formData: FormData) => {
  const validatedData = ServiceDeleteFormData.parse(Object.fromEntries(formData));
  await prisma.service.delete({
    where: { id: validatedData.serviceId },
  });
  redirect(`/prestations`);
};
