import { Prisma } from "@prisma/client";
import NavBar from "../../../navbar";
import { bookPrestation, getPrestationServices } from "../../actions";

type PrestationBookPageProps = {
  params: {
    prestationId: string;
  };
};

const PrestationBookPage = async ({ params }: PrestationBookPageProps) => {
  const prestations = await getPrestationServices(params.prestationId);
  return (
    <>
      <NavBar />
      <form action={bookPrestation} className="flex flex-col w-1/4 gap-4 p-4 m-auto bg-violet-100 rounded-xl">
        <label htmlFor="datetime">Date et heure souhaiter</label>
        <input type="datetime-local" name="datetime" id="datetime" className="p-2 rounded-lg" />
        <label htmlFor="description">Decrivez votre demande</label>
        <textarea name="description" id="description" className="p-2 rounded-lg" />
        {prestations.services.map((service) => (
          <div key={service.id} className="flex p-4 rounded-lg bg-violet-200">
            <label htmlFor={service.id} className="flex-grow">
              <div className="flex flex-col">
                <h2>{service.name}</h2>
                <p>{service.description}</p>
              </div>
            </label>
            <input type="checkbox" name="services" id={service.id} value={service.id} className="p-2 rounded-lg" />
          </div>
        ))}
        <button type="submit" name="prestationId" value={params.prestationId} className="p-2 bg-violet-300 rounded-xl">
          Book
        </button>
      </form>
    </>
  );
};

export default PrestationBookPage;
