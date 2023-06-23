"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export const SearchBar = () => {
  const [date, setDate] = useState<Date>();
  const searchParams = new URLSearchParams(
    date ? { date: date.toISOString() } : undefined
  );
  return (
    <div className="flex flex-row gap-4 bg-white rounded-2xl shadow-2xl px-8 py-4 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <CalendarIcon className="text-violet-400" />
            {date ? date.toLocaleDateString() : "Choisir une date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            fromDate={new Date()}
          />
        </PopoverContent>
      </Popover>
      <Link href={`/search${searchParams && "?" + searchParams}`}>
        <Button>Rechercher</Button>
      </Link>
    </div>
  );
};

export default SearchBar;
