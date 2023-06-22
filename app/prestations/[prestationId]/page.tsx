import { HiOutlineHeart, HiHeart, HiStar } from "react-icons/hi2";
import Image from "next/image";

import prisma from "@/lib/prisma";
import { getBlurDataUrl } from "./images/blur-data-url";
import BookPrestation from "./book-prestation";

const getPrestation = async (prestationId: string) => {
  return await prisma.prestation.findUniqueOrThrow({
    where: {
      id: prestationId,
    },
    include: {
      _count: {
        select: {
          Rates: true,
          Likes: true,
        },
      },
      Images: {
        select: {
          url: true,
        },
      },
      User: {
        select: {
          _count: {
            select: {
              Rates: true,
            },
          },
          name: true,
          image: true,
        },
      },
      Rates: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          value: true,
          description: true,
          createdAt: true,
          User: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      },
    },
  });
};

type PrestationPageProps = {
  params: {
    prestationId: string;
  };
};

export const PrestationPage = async ({ params }: PrestationPageProps) => {
  const prestation = await getPrestation(params.prestationId);
  const aggregate = await prisma.rate.aggregate({
    where: {
      prestationId: params.prestationId,
    },
    _avg: {
      value: true,
    },
  });
  const header = (
    <div className="flex flex-row items-center">
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl ">{prestation.name}</h1>
        <div className="flex items-center gap-2">
          <HiStar className="text-lg text-yellow-400" />
          <p className="text-md">
            {" "}
            {aggregate._avg.value?.toPrecision(2)} • {prestation._count.Rates}{" "}
            commentaires
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <HiOutlineHeart className="text-4xl text-red-500" />
        <p className="text-sm text-gray-400">
          {prestation._count.Likes} personnes aiment
        </p>
      </div>
    </div>
  );
  const imagesGrid = (
    <div className="grid grid-rows-2 grid-cols-4 grid-flow-col gap-4 aspect[1/2] rounded-3xl overflow-hidden">
      <div className="relative row-span-2 col-span-2">
        <Image
          src={prestation.Images[0].url}
          alt="cover picture"
          fill
          placeholder="blur"
          blurDataURL={await getBlurDataUrl(prestation.Images[0].url)}
          className="object-cover"
        />
      </div>
      {prestation.Images.slice(1).map(async (image) => (
        <div key={image.url} className="relative aspect-square">
          <Image
            src={image.url}
            alt="cover picture"
            fill
            placeholder="blur"
            blurDataURL={await getBlurDataUrl(image.url)}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
  const categoryPrestation = (
    <div className="flex flex-col">
      <h2 className="text-xl">Catégorie</h2>
      <p className="text-3xl text-violet-400">{prestation.categoryName}</p>
    </div>
  );

  const userProfile = (
    <div className="flex flex-row items-center gap-4">
      <div className="flex flex-col items-end">
        <p className="text-xl">{prestation.User.name}</p>
        <p className="text-gray-500">
          {prestation.User._count.Rates} commentaires
        </p>
      </div>
      <Image
        src={prestation.User.image ?? "/logo.png"}
        alt={prestation.User.name + " profile picture"}
        width={50}
        height={50}
        className="shadow-lg rounded-full"
      />
    </div>
  );
  const description = (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Description</h2>
      <hr />
      <p className="text-md">{prestation.description}</p>
    </div>
  );
  const comments = (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Commentaires</h2>
      <hr />
      <ul className="flex flex-row overflow-x-scroll gap-4 snap-x">
        {prestation.Rates.map((rate) => (
          <li
            key={rate.User.id}
            className="p-4 flex-shrink-0 w-96 rounded-lg border snap-start"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={rate.User.image ?? "/logo.png"}
                  alt={rate.User.name + " profile picture"}
                  width={34}
                  height={34}
                  className="shadow-lg rounded-full"
                />
                <div className="flex-1 flex-col flex">
                  <p className="text-xl">{rate.User.name}</p>
                  <p className="text-gray-500 text-sm ">
                    {rate.createdAt.toLocaleDateString(undefined, {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <p>{rate.value}</p>
                  <HiStar className="text-2xl text-yellow-400" />
                </div>
              </div>
              <hr />
              <p>{rate.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="py-8 px-8 2xl:px-48 md:px-24 flex flex-col gap-8">
      {header}
      {imagesGrid}
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-8 w-3/5">
          <div className="flex flex-row items-center justify-between">
            {categoryPrestation}
            {userProfile}
          </div>
          {description}
          {comments}
        </div>
        <div className="w-2/5 relative">
          <BookPrestation {...prestation} />
        </div>
      </div>
    </div>
  );
};

export default PrestationPage;
