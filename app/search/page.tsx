import { Prestation, Image as PrestationImage } from "@prisma/client";
import Image from "next/image";

import prisma from "@/lib/prisma";
import PrestationCard from "@/app/prestations/[prestationId]/card";
import logo from "@/public/logo.png";

type SearchPageProps = {
  searchParams?: {
    query?: string;
    category?: string;
    date?: string;
  };
};

const searchPrestations = async ({ searchParams }: SearchPageProps) => {
  return await prisma.prestation.findMany({
    orderBy: [
      {
        Likes: {
          _count: "desc",
        },
      },
      {
        Bookings: {
          _count: "desc",
        },
      },
    ],
    where: {
      categoryName: searchParams?.category,
      ...(searchParams?.date && {
        Bookings: {
          none: {
            date: {
              gte: new Date(searchParams?.date),
              lt: new Date(
                new Date(searchParams?.date).getTime() + 24 * 60 * 60 * 1000
              ),
            },
          },
        },
      }),
      ...(searchParams?.query && {
        OR: [
          {
            name: {
              contains: searchParams?.query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchParams?.query,
              mode: "insensitive",
            },
          },
        ],
      }),
    },
    include: {
      Images: {
        take: 1,
        select: {
          url: true,
        },
      },
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
};

export const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const prestations = await searchPrestations({ searchParams });
  return (
    <div className="lg:px-24 px-12 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {prestations.map((prestation) => PrestationCard({ ...prestation }))}
      </div>
    </div>
  );
};

export default SearchPage;
