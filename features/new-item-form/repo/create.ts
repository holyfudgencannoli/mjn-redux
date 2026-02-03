import { safeRun } from "@/adapters/sqlite";
import { ItemType } from "@/type-models/db/item";
import { SQLiteDatabase } from "expo-sqlite";

export type ItemCoreFields = Omit<ItemType, "id">;

export async function create(
  db: SQLiteDatabase,
  params: ItemCoreFields
): Promise<number> {
  console.log("Creating item with params:", params);
  const result = await safeRun(
    db,
    "INSERT INTO items (name, category, subcategory, type, created_at, par, last_updated) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      params.name,
      params.category,
      params.subcategory,
      params.type,
      params.created_at,
      params.par ?? 0,
      params.last_updated,
    ]
  );

  return result.lastInsertRowId;
}
