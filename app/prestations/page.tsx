import Link from "next/link";
import {
  getCategories,
  createCategory,
  searchCategoryPrestations,
  searchCategoryPrestationsRedirect,
  getPrestations,
} from "./actions";
import PrestationCard from "./[prestationId]/card";
import NavBar from "../navbar";
import { auth } from "@clerk/nextjs";

export type PrestationsPageProps = {
  searchParams?: {
    search?: string;
    categoryName?: string;
  };
};

const PrestationActionsNav = () => {
  const { userId, orgId } = auth();

  return (
    <div className="flex gap-2">
      {orgId && (
        <Link href="/prestations/new">
          <button className="p-2 text-sm bg-violet-100 rounded-xl">Creer une prestation</button>
        </Link>
      )}
      {userId && (
        <Link href="/bookings">
          <button className="p-2 text-sm bg-violet-200 rounded-xl">Mes réservations</button>
        </Link>
      )}
    </div>
  );
};

const CategoriesNav = async () => {
  const categories = await getCategories();
  return (
    <ul className="flex items-center gap-4 p-4">
      <li>
        <form action={createCategory} className="p-2 rounded-lg bg-violet-50">
          <input type="text" name="name" className="bg-violet-50" placeholder="New category" />
          <button type="submit">+</button>
        </form>
      </li>
      {categories.map((category) => (
        <Link href={`/prestations/?category=${category.name}`} key={category.id}>
          <li key={category.id}>{category.name}</li>
        </Link>
      ))}
    </ul>
  );
};

export const PrestationsPage = async ({ searchParams }: PrestationsPageProps) => {
  const prestations = await getPrestations();
  return (
    <div>
      <NavBar actions={<PrestationActionsNav />}>
        <div className="flex px-4 py-2 rounded-full bg-violet-100">
          <form action={searchCategoryPrestationsRedirect}>
            <input type="text" placeholder="Search" className="bg-violet-100" name="search" />
            <button type="submit" name="categoryName" value={searchParams?.categoryName}>
              🔍
            </button>
          </form>
        </div>
      </NavBar>
      {/* @ts-expect-error Async Server Component */}
      <CategoriesNav />
      <div className="grid grid-cols-4 gap-4 p-4">{prestations.map((prestation) => PrestationCard(prestation))}</div>
    </div>
  );
};

export default PrestationsPage;
