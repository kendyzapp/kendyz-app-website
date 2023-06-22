import { auth } from "@clerk/nextjs";
import { getBooking } from "../page";
import { HiChatBubbleLeftRight, HiPaperAirplane } from "react-icons/hi2";

type BookingMessagesProps = {
	params: {
		bookingId: string;
	};
};

const BookinkgMessages = async ({ params }: BookingMessagesProps) => {
	const booking = await getBooking(params.bookingId);
	return (
		<div className="p-4 border rounded-xl flex flex-col gap-4 h-96 ">
			<div className="flex gap-2">
				<HiChatBubbleLeftRight className="w-6 h-6 text-violet-400 text-lg" />
				<p>Messages</p>
			</div>
			<div className="flex flex-col gap-2 h-full">
				{booking.messages.map((message) => (
					<div className="flex flex-col gap-2">
						<div className="flex gap-2">
							<p>{message.content}</p>
						</div>
					</div>
				))}
			</div>
			<div className="flex gap-2 ">
				<input type="text" className="border rounded-xl w-full" />
				<button>
					<HiPaperAirplane className="w-6 h-6 text-violet-400 text-lg" />
				</button>
			</div>
		</div>
	);
};

export default BookinkgMessages;
