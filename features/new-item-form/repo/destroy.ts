import { safeRun } from "@/adapters/sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export async function destroy(db: SQLiteDatabase, id: number) {
  const result = await safeRun(
    db,
    "DELETE FROM items WHERE id = ?",
    [id]
  );

  return result.changes; // rows deleted
}

