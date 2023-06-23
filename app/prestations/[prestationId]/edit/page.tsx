import prisma from "@/lib/prisma";

type PrestationEditPageProps = {
  params: {
    prestationId: string;
  };
};

const getOrgPrestation = async (prestationId: string) => {
  const { orgId } = auth();
  if (!orgId) throw new Error("No auth user found");
  const prestation = await prisma.prestation.findFirstOrThrow({
    where: {
      id: prestationId,
      organizationId: orgId,
    },
  });
  return prestation;
};

const PrestationEditPage = async ({ params }: PrestationEditPageProps) => {
  const prestation = await getOrgPrestation(params.prestationId);
  return (
    <div>
      <h1>Prestation Edit Page</h1>
    </div>
  );
};

export default PrestationEditPage;
