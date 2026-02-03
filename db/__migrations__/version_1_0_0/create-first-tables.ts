import { safeExec } from "@/db/utils";
import { SQLiteDatabase } from "expo-sqlite";
import { createIndexes } from "./create-indexes";
import { tableStatements } from "./first_statements";

export default async function create_first_tables(db: SQLiteDatabase, version: number): Promise<string[] | string> {  
  await safeExec(db, "PRAGMA journal_mode = 'wal';")

  for (let i = 0; i < tableStatements.length; i++) {
    const query = tableStatements[i];
    await safeExec(db, query);
  }
    
  createIndexes(db)

  await safeExec(db, "PRAGMA foreign_keys = ON;");
  if (
    version === 30000
  ) {

    await safeExec(db, `PRAGMA user_version = ${version}`);

    const tables: string[] = await db.getAllAsync(
      `SELECT name FROM sqlite_master WHERE type='table';`
    );

    const Version = `App Version === ${version}`
    const Tables = `Tables in DB:, ${tables.map((t: any) => t.name)}`
    
    return [Version, Tables]
  } else {
    return `➡️ Continuing Migration to Version ${version}`
  }  
} 