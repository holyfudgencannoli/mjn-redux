import { safeExec } from "@/db/utils";
import { SQLiteDatabase } from "expo-sqlite";
import { indexStatements } from "./first_statements";

export async function createIndexes(db: SQLiteDatabase) {
  for (let i = 0; i < indexStatements.length; i++) {
    const query = indexStatements[i];
    await safeExec(db, query);
  }
};

