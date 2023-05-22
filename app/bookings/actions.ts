"use server";

import { auth } from "@clerk/nextjs";
import prisma from "../../lib/prisma";
import getStripe from "@/lib/stripe";
import { z } from "zod";
import { redirect } from "next/navigation";

export const getUserBookings = async () => {
  const id = auth().userId || auth().orgId;
  if (!id) throw new Error("No user found");
  const bookings = await prisma.booking.findMany({
    where: {
      OR: [{ clientId: id }, { prestation: { organizationId: id } }],
    },
    select: {
      id: true,
      datetime: true,
      prestation: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return bookings;
};

export const getBooking = async (bookingId: string) => {
  const { userId, orgId } = auth();
  if (!userId && !orgId) throw new Error("No auth user found");
  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
    include: { prestation: true, services: true },
  });
  if (booking.clientId !== userId && booking.prestation.organizationId !== orgId) throw new Error("Unauthorized");
  return booking;
};

export const setBookingStatus = async (formData: FormData) => {
  const newStatus = formData.get("status");
};

export const cancelBooking = async (bookingId: string) => {
  console.log(bookingId);
  redirect(`/bookings/`);
};

export const confirmBooking = async (bookingId: string) => {
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CONFIRMED" },
  });
  redirect(`/bookings/${bookingId}`);
};
