import { safeSelectAll, safeSelectOne } from "@/adapters/sqlite";
import { ItemType } from "@/type-models/db/item";
import { SQLiteDatabase } from "expo-sqlite";

export async function getById(
  db: SQLiteDatabase,
  id: number
): Promise<ItemType | null> {
  return await safeSelectOne<ItemType>(db, "SELECT * FROM items WHERE id = ?", [id]);
}

export async function getAllByType(
  db: SQLiteDatabase,
  type: string
): Promise<ItemType[]> {
  return await safeSelectAll<ItemType>(db, "SELECT * FROM items WHERE type = ?", [type]);
}

export async function getByName(
  db: SQLiteDatabase,
  name: string
): Promise<ItemType | null> {
  return await safeSelectOne<ItemType>(db, "SELECT * FROM items WHERE name = ?", [name]);
}
