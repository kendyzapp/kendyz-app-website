import Link from "next/link";
import { createPrestation } from "../prisma/seed";

async function seed() {
  "use server";
  for (let i = 0; i < 10; i++) {
    await createPrestation();
  }
}

export const RootPage = () => {
  return (
    <>
      <div>
        <h1>Root Page</h1>
      </div>
      <Link href="/prestations">Voir les prestations</Link>
      <form action={seed}>
        <button type="submit" className="p-2 text-sm shadow bg-violet-200 rounded-xl">
          Seed !
        </button>
      </form>
    </>
  );
};

export default RootPage;
