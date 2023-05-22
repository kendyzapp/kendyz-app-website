import NavBar from "@/app/navbar";
import { getBooking } from "../actions";
import Link from "next/link";
import Image from "next/image";
import { cancelBooking, setBookingStatus, confirmBooking } from "../actions";

type BookingPageProps = {
  params: {
    bookingId: string;
  };
};

export const BookingPage = async ({ params }: BookingPageProps) => {
  const booking = await getBooking(params.bookingId);
  return (
    <div>
      <NavBar />
      <div className="flex justify-center gap-4 p-4 bg-violet-50 rounded-3xl">
        <div className="flex flex-col gap-4">
          <h2>{booking.datetime.toLocaleString()}</h2>
          <p>{booking.description}</p>
          <ul className="flex flex-col gap-2">
            {booking.services.map((service) => (
              <li key={service.id} className="p-4 bg-violet-100 rounded-xl">
                <h4>{service.name}</h4>
                <p>{service.description}</p>
              </li>
            ))}
          </ul>
          <form className="flex gap-4" action={setBookingStatus}>
            <button className="p-2 text-sm shadow bg-violet-200 rounded-xl" name="confirm">
              Valider
            </button>
            <button className="p-2 text-sm shadow bg-violet-200 rounded-xl" name="cancel">
              Annuler
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-violet-100 rounded-3xl">
          <h1 className="text-3xl">{booking.prestation.name}</h1>
          <Image
            src={booking.prestation.image}
            alt={booking.prestation.name}
            width={640}
            height={480}
            className="rounded-2xl"
          />
          <p>{booking.prestation.description}</p>
          <Link href={`/prestations/${booking.prestation.id}`}>
            <button className="p-2 text-sm shadow bg-violet-200 rounded-xl">Voir la prestation</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
