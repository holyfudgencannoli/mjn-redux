import { safeSelectOne } from "@/adapters/sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export async function exists(db: SQLiteDatabase, id: number) {
  const row = await safeSelectOne<{ count: number }>(
    db,
    "SELECT COUNT(*) as count FROM items WHERE id = ?",
    [id]
  );

  return row?.count === 1;
}
