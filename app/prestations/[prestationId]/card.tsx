import { Prestation, PrestationImage, User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

import { getBlurDataUrl } from "./images/blur-data-url";

const PrestationCard = async ({
  name,
  id,
  Images: [{ url: imageUrl }],
  User: { name: userName, image: userImage },
}: Prestation & {
  Images: {
    url: string;
  }[];
  User: {
    image: string | null;
    name: string | null;
  };
}) => {
  const footer = (
    <div className="flex flex-row px-4">
      <div className="flex-1">
        <h2 className="text-xl">{name}</h2>
        <h3 className="text-gray-500">{userName}</h3>
      </div>
      <div className="relative">
        <Image
          src={userImage ?? "/logo.png"}
          alt={userName + " profile picture"}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
    </div>
  );
  return (
    <Link key={name} href={`/prestations/${id}`}>
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={userName + " cover picture"}
            fill
            placeholder="blur"
            blurDataURL={await getBlurDataUrl(imageUrl)}
            className="rounded-3xl shadow-2xl object-cover"
          />
        </div>
        {footer}
      </div>
    </Link>
  );
};

export default PrestationCard;
