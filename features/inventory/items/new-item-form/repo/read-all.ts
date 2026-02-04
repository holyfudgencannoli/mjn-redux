import { safeSelectAll } from "@/adapters/sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export async function readAll<ItemType>(db: SQLiteDatabase): Promise<ItemType[]> {
  return await safeSelectAll<ItemType>(db, "SELECT * FROM items ORDER BY id ASC");
}
