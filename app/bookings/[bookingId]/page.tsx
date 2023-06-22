import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

type BookingPageProps = {
	params: {
		bookingId: string;
	};
};

export async function getBooking(bookingId: string) {
	"use server";
	const { userId, orgId } = auth();
	if (!userId && !orgId) throw new Error("No auth user found");
	const booking = await prisma.booking.findFirstOrThrow({
		where: {
			id: bookingId,
			OR: [{ clientId: userId }, { prestation: { organizationId: orgId } }],
		},
		include: { prestation: true, services: true, messages: true },
	});
	return booking;
}

export const BookingPage = async ({ params }: BookingPageProps) => {
	const booking = await getBooking(params.bookingId);
	return (
		<div className="px-8 lg:px-24 py-4">
			<div className="flex ">
				<div className="flex flex-col gap-4 w-3/5"></div>
			</div>
		</div>
	);
};

export default BookingPage;
