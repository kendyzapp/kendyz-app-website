import NavBar from "@/app/navbar";
import { getPrestation, deletePrestation, getPrestationServices, deleteService } from "../actions";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

type PrestationPageProps = {
  params: {
    prestationId: string;
  };
};

export const generateMetadata = async ({ params }: PrestationPageProps): Promise<Metadata> => {
  const prestation = await getPrestation(params.prestationId);
  return {
    title: `Kendyz - ${prestation.name}`,
  };
};

export const PrestationPage = async ({ params }: PrestationPageProps) => {
  const prestation = await getPrestationServices(params.prestationId);
  return (
    <>
      <NavBar />
      <div className="flex flex-col w-1/2 gap-4 p-4 m-auto bg-violet-100 rounded-xl">
        <h1 className="text-3xl">{prestation.name}</h1>
        <Image src={prestation.image} alt={prestation.name} width={640} height={480} />
        <p className="p-2 text-sm rounded-lg bg-violet-200">{prestation.category?.name}</p>
        <p>{prestation.description}</p>
        {prestation.services.map((service) => (
          <div key={service.id} className="flex p-4 rounded-lg bg-violet-300">
            <div>
              <h2 className="text-xl">{service.name}</h2>
              <p>{service.description}</p>
            </div>
            <form action={deleteService}>
              <button className="p-2 text-sm bg-red-400 rounded-xl" name="serviceId" value={service.id}>
                Delete
              </button>
            </form>
          </div>
        ))}
        <div className="flex gap-2">
          <Link href={`/prestations/${prestation.id}/book`}>
            <button className="p-2 text-sm bg-violet-400 rounded-xl">Book</button>
          </Link>
          <Link href={`/prestations/${prestation.id}/edit`}>
            <button className="p-2 text-sm bg-orange-400 rounded-xl">Edit</button>
          </Link>
          <Link href={`/prestations/${prestation.id}/services/add`}>
            <button className="p-2 text-sm bg-green-400 rounded-xl">Add Service</button>
          </Link>
          <form action={deletePrestation}>
            <button type="submit" name="delete" value={prestation.id} className="p-2 text-sm bg-red-400 rounded-xl">
              Delete
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PrestationPage;
