import { Prestation } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

const PrestationCard = (prestation: Prestation) => {
  return (
    <Link key={prestation.id} href={`/prestations/${prestation.id}`}>
      <div className="flex flex-col p-4 bg-violet-200 rounded-xl">
        <Image src={prestation.image} alt={prestation.name} width={640} height={480} />
        <h1>{prestation.name}</h1>
        <p>{prestation.description}</p>
      </div>
    </Link>
  );
};

export default PrestationCard;
