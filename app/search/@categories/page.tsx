import prisma from "@/lib/prisma";
import Link from "next/link";

const getCategories = async () => {
  return await prisma.category.findMany();
};

type CategoriesNavBarProps = {
  searchParams?: {
    query?: string;
    category?: string;
  };
};

export const CategoriesNavBar = async ({
  searchParams,
}: CategoriesNavBarProps) => {
  const categories = await getCategories();
  return (
    <>
      <hr />
      <ul className="flex  justify-between gap-4 lg:px-24 px-12 py-4 ">
        {categories.map((category) => {
          const newSearchParams = { ...searchParams, category: category.name };
          const href = {
            pathname: "/search",
            query: newSearchParams,
          };
          return (
            <Link key={category.name} href={href}>
              <h4
                key={category.name}
                className={`py-2 line-clamp-1 transition-all rounded-full hover:bg-slate-100 px-4 hover:text-violet-500  ${
                  searchParams?.category === category.name
                    ? "bg-slate-100 text-violet-500"
                    : "text-slate-400"
                }`}
              >
                {category.name}
              </h4>
            </Link>
          );
        })}
      </ul>
      <hr />
    </>
  );
};

export default CategoriesNavBar;
