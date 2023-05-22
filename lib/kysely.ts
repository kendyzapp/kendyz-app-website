import { createKysely } from "@vercel/postgres-kysely";
import { Generated, ColumnType } from "kysely";

type Category = {
  id: Generated<string>;
  name: string;
  prestations: PrestationTable[];
};

enum PrestationStatus {
  DRAFT,
  PUBLISHED,
}

type PrestationTable = {
  id: Generated<string>;
  name: string;
  status: PrestationStatus;
  organizationId: string;
  description: string;
};

type Database = {
  prestation: PrestationTable;
};

const kysely = createKysely();
