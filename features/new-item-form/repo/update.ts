import { safeRun } from "@/adapters/sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { ItemCoreFields } from "./create";

export async function update(db: SQLiteDatabase, id: number, data: Partial<ItemCoreFields>) {
  const { ...fields } = data;

  const setClauses: string[] = [];
  const values: any[] = [];

  let key: keyof ItemCoreFields;

  for (key in fields) {
    if (fields[key] !== undefined) {
      setClauses.push(`${key} = ?`);
      values.push(fields[key]);
    }
  }

  if (setClauses.length === 0) return 0; // nothing to update

  values.push(id); // for WHERE clause
  const query = `UPDATE items SET ${setClauses.join(', ')} WHERE id = ?`;

  const result = await safeRun(db, query, values);
  return result.changes;
}


