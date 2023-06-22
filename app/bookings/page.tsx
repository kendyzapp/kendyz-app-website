import { auth } from "@clerk/nextjs";
import Link from "next/link";
import prisma from "@/lib/prisma";

async function getBookings() {
	"use server";
	const { userId, orgId } = auth();
	if (!userId && !orgId) throw new Error("No auth user found");
	const booking = await prisma.booking.findMany({
		where: {
			OR: [{ clientId: userId }, { prestation: { organizationId: orgId } }],
		},
		include: { prestation: true, services: true, messages: true },
	});
	return booking;
}

export const BookingsPage = async () => {
	const bookings = await getBookings();
	return (
		<div>
			<ul className="grid grid-cols-3 gap-4 py-4 px-8 lg:px-24">
				{bookings.map((booking) => (
					<Link href={`/bookings/${booking.id}`} key={booking.id}>
						<li key={booking.id} className="flex flex-col p-4 bg-violet-100 rounded-xl">
							<h2>{booking.datetime.toLocaleDateString()}</h2>
							<h3>{booking.prestation.name}</h3>
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default BookingsPage;
