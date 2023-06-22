import { createPrestationService } from "../../../../@prestations/actions";

type PrestationServiceAddPageProps = {
  params: {
    prestationId: string;
  };
};

const PrestationServiceAddPage = ({ params }: PrestationServiceAddPageProps) => {
  return (
    <div>
      <h1>Prestation Service Add Page</h1>
      <form action={createPrestationService} className="flex flex-col w-1/4 gap-4 m-auto">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" className="rounded-md" />
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" className="rounded-xl h-28" />
        </div>
        <button type="submit" name="prestationId" value={params.prestationId} className="p-4 bg-violet-300 rounded-2xl">
          Create
        </button>
      </form>
    </div>
  );
};

export default PrestationServiceAddPage;
