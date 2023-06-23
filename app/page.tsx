import Image, { StaticImageData } from "next/image";
import { Check } from "lucide-react";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import home from "@/public/home.jpg";
import logo from "@/public/logo.png";
import pro from "@/public/pro.jpg";
import client from "@/public/client.jpg";
import SearchBar from "./search-bar";

const HeroSection = (
  title: string,
  subtitle: String,
  keys: string[],
  left: boolean,
  imageSrc: StaticImageData
) => {
  const image = (
    <div className="rounded-full w-1/3 h-1/4">
      <Image src={imageSrc} alt="" className="rounded-full shadow-lg" />
    </div>
  );
  return (
    <div className="flex flex-row gap-8 py-16 items-center justify-evenly">
      {left && image}
      <div className="flex flex-col gap-8 items-center w-1/3">
        <h2 className="text-4xl font-bold text-center">{title}</h2>
        <h3 className="text-xl font-medium text-center">{subtitle}</h3>
        <ul className="space-y-2">
          {keys.map((key) => (
            <li key={key} className="flex flex-row gap-4 items-center">
              <Check className="text-2xl text-violet-400" />
              <p>{key}</p>
            </li>
          ))}
        </ul>
      </div>
      {!left && image}
    </div>
  );
};

export const RootPage = () => {
  const main = (
    <div className="relative">
      <h1 className="absolute top-16 text-4xl font-bold text-white shadow-2xl left-1/2 -translate-x-1/2 text-center">
        Automatisez l’embauche de vos prestataires de festivités
      </h1>
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <SearchBar />
      </div>
      <Image src={home} alt="" className="" />
    </div>
  );
  const proSection = HeroSection(
    "Organisateur de festivités",
    "KENDYZ automatise vos démarches administratives liées à l’embauche de vos prestataires de festivités.",
    [
      "Identifiez votre prestataire",
      "Contractualisez et facilitez vos démarches SACEM/GUSO",
      "Payez votre prestataire de façon sécurisée",
      "Inscription & utilisation gratuites",
      "Frais de service KENDYZ lors de votre transaction avec le prestataire",
    ],
    true,
    pro
  );
  const clientSection = HeroSection(
    "Organisateur de festivités",
    "KENDYZ automatise vos démarches administratives liées à l’embauche de vos prestataires de festivités.",
    [
      "Identifiez votre prestataire",
      "Contractualisez et facilitez vos démarches SACEM/GUSO",
      "Payez votre prestataire de façon sécurisée",
      "Inscription & utilisation gratuites",
      "Frais de service KENDYZ lors de votre transaction avec le prestataire",
    ],
    false,
    client
  );
  const footer = (
    <div className="flex flex-col py-8 px-12 items-center">
      <div className="flex flex-row justify-evenly w-full">
        <div className="flex flex-col gap-4 items-center">
          <h6 className="text-lg font-medium">À PROPOS DE NOUS</h6>
          <p>Notre histoire</p>
          <p>Nous rejoindre</p>
          <p>Actualités</p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h6 className="text-lg font-medium">SERVICES</h6>
          <p>Rechercher une préstation</p>
          <p>Inscrire mon activité</p>
          <p>Notre application mobile</p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h6 className="text-lg font-medium">POLITIQUE & CGU</h6>
          <p>Condition générales prestataires</p>
          <p>Conditions générales organisateurs</p>
          <p>Politique de confidentialité</p>
        </div>
      </div>
      <hr className="my-8 w-full" />
      <Image src={logo} alt="logo Kendyz" width={100} />
    </div>
  );
  return (
    <div className="flex flex-col">
      {main}
      {clientSection}
      <hr className="my-4" />
      {proSection}
      <hr className="my-4" />
      {footer}
    </div>
  );
};

export default RootPage;
