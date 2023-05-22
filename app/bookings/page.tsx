import NavBar from "../navbar";
import { getUserBookings } from "./actions";
import Link from "next/link";

export const BookingsPage = async () => {
  const bookings = await getUserBookings();
  return (
    <div>
      <NavBar />
      <ul className="grid grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <Link href={`/bookings/${booking.id}`} key={booking.id}>
            <li key={booking.id} className="flex flex-col p-4 m-4 bg-violet-100 rounded-xl">
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
