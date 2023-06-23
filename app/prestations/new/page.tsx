import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const PrestationNewPage = () => {
  const createPrestation = async (formData: FormData) => {
    "use server";
    const name = String(formData.get("name"));
    const description = String(formData.get("description"));
    const price = Number(formData.get("price"));
    if (!name || !description || !price) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    const prestation = await prisma.prestation.create({
      data: {
        name: name,
        description: description,
        category: {
          connect: {
            name: "music",
          },
        },
      },
    });
    redirect(`/prestations/${prestation.id}`);
  };
  return (
    <div className="w-3/5 flex flex-col gap-4">
      <form action={createPrestation} className="flex flex-col gap-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="border rounded-xl p-4"
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          className="border rounded-xl p-4 h-28"
        />
        <label htmlFor="price">Prix</label>
        <input
          type="number"
          name="price"
          id="price"
          className="border rounded-xl p-4"
        />
        <button className="bg-purple-500 text-white rounded-xl p-4">
          Créer
        </button>
      </form>
    </div>
  );
};

export default PrestationNewPage;
