import { getPrestation } from "../../actions";

type PrestationEditPageProps = {
  params: {
    prestationId: string;
  };
};

const PrestationEditPage = async ({ params }: PrestationEditPageProps) => {
  const prestation = await getPrestation(params.prestationId);
  return (
    <div>
      <h1>Prestation Edit Page</h1>
    </div>
  );
};

export default PrestationEditPage;
