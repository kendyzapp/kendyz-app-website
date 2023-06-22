"use client";

import { Prestation } from "@prisma/client";
import useSwr from "swr";
import { HTMLAttributes, useState } from "react";

import client from "@/lib/apple/apple-maps-server-client";
import { paths, components } from "@/lib/apple/apple-maps-server-api";

type SearchAutocompleteFetchParams =
  paths["/searchAutocomplete"]["get"]["parameters"]["query"];
type SearchAutocompleteFetchError = components["schemas"]["ErrorResponse"];

const searchAutocompleteFetch = async (
  params: SearchAutocompleteFetchParams
) => {
  const { data, error } = await client.get("/searchAutocomplete", {
    params: {
      query: {
        q: "Paris",
        lang: "fr-FR",
      },
    },
  });
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
};

const BookPrestation = ({ id }: Prestation) => {
  const [query, setQuery] = useState<SearchAutocompleteFetchParams | null>(
    null
  );
  const { data, error, isLoading } = useSwr(
    query ? ["/searchAutocomplete", query] : null,
    async (params: SearchAutocompleteFetchParams) =>
      await searchAutocompleteFetch(params)
  );
  return (
    <div className="p-8 shadow-xl rounded-2xl flex flex-col gap-4">
      <div>
        <h1 className="text-xl">Book Prestation</h1>
        <hr className="my-2" />
      </div>
      <input type="datetime-local" className="p-4 rounded-xl border  w-full" />
      <input
        type="search"
        placeholder="Lieux de l'évènement"
        className="p-4 rounded-xl border"
        value={query?.q || ""}
        onChange={(e) => setQuery({ ...query, q: e.target.value })}
      />
      <textarea
        className="p-4 rounded-xl border h-48 resize-none"
        placeholder="La description de votre évènement."
      />

      <button className="py-4 px-8 rounded-lg w-full shadow-lg text-xl text-white text-center bg-violet-400">
        Contacter
      </button>
    </div>
  );
};

export default BookPrestation;
