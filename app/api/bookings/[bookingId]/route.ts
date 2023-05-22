import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type BookingIdRouteProps = {
  params: {
    bookingId: string;
  };
};

export const DELETE = async (request: NextRequest, { params }: BookingIdRouteProps) => {
  const booking = await prisma.booking.update({
    where: { id: params.bookingId },
    data: { status: "CANCELLED" },
  });
  if (booking) {
    return NextResponse.redirect("/bookings");
  }
  return NextResponse.error();
};
