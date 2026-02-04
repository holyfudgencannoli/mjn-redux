
import { safeRun, safeSelectAll, safeSelectOne } from "@db/utils";
import { PurchaseLogType, PurchaseType } from "@types";
import { SQLiteDatabase } from "expo-sqlite";
import { onError } from "./services";

const VALID_TYPES = new Set([
  "inventory_item",
  "raw_material",
  "bio_material",
  "consumable_item",
  "hardware_item",
  // add more as needed
]);

export function purchaseLogTable(type: string) {
  if (!VALID_TYPES.has(type)) {
    throw new Error(`Invalid type: ${type}`);
  }
  return `${type}_purchase_logs`;
}


export async function create(
  db: SQLiteDatabase,
  type: string,
  item_id: number,
	created_at: number,
	purchase_date: number,
	purchase_unit: string,
	purchase_amount: number,
	inventory_unit: string,
	inventory_amount: number,
	vendor_id: number,
	brand: string,
	receipt_uri: string,
	cost: number
) {
  const result = await safeRun(db,
    `INSERT INTO purchase_logs (type, item_id, created_at, purchase_date, purchase_unit, purchase_amount, inventory_unit, inventory_amount, vendor_id, brand, receipt_uri, cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      type,
      item_id, 
      created_at,
      purchase_date,
      purchase_unit,
      purchase_amount,
      inventory_unit,
      inventory_amount,
      vendor_id,
      brand,
      receipt_uri,
      cost
    ]
  );

  return result.lastInsertRowId;
}

export async function readAll<PurchaseLogData>(db: SQLiteDatabase) {
  return await safeSelectAll<PurchaseLogData>(db, `SELECT * FROM purchase_logs ORDER BY id DESC`);
}

export async function getAllByType<PurchaseLogData>(db: SQLiteDatabase, type: string) {
  return await safeSelectAll<PurchaseLogData>(db, `SELECT * FROM purchase_logs WHERE type = ?`, [type]);
}

export async function getById(
  db: SQLiteDatabase,
  id: number
): Promise<PurchaseLogType | null> {
  return await safeSelectOne<PurchaseLogType>(db, `SELECT * FROM purchase_logs WHERE id = ?`, [id]);
}


export async function getByItemId(
	db: SQLiteDatabase,
	type: PurchaseType<string>,
	item_id: number
) {
	return await safeSelectAll<PurchaseLogType>(db, `SELECT * FROM purchase_logs WHERE item_id = ?`, [item_id]);
}

export { onError };

export async function update(
  db: SQLiteDatabase,
	type: string,
	id: number,
	item_id: number,
	created_at: number,
	purchase_date: number,
	purchase_unit: string,
	purchase_amount: number,
	inventory_unit: string,
	inventory_amount: number,
	vendor_id: number,
	brand_id: number,
	receipt_uri: string,
	cost: number
) {
  const result = await safeRun(
    db,
    `UPDATE purchase_logs
       SET item_id = ?, created_at = ?, purchase_date = ?, purchase_unit = ?, purchase_amount = ?, inventory_unit = ?, inventory_amount = ?, vendor_id = ?, brand_id = ?, receipt_uri = ?, cost = ?
       WHERE id = ?`,
     [
			item_id, 
			created_at,
			purchase_date,
			purchase_unit,
			purchase_amount,
			inventory_unit,
			inventory_amount,
			vendor_id,
			brand_id,
			receipt_uri,
			cost,
			id
		]
  );

  return result.changes; // number of rows updated
}

export async function destroy(db: SQLiteDatabase, type: string, id: number) {
  const result = await safeRun(
    db,
    `DELETE FROM purchase_logs WHERE id = ?`,
    [id]
  );

  return result.changes; // rows deleted
}



export async function exists(
  db: SQLiteDatabase,
  type: string,
  id: number
) {
  const row = await safeSelectOne<{ count: number }>(
    db,
    `SELECT COUNT(*) AS count FROM purchase_logs WHERE id = ?`,
    [id]
  );

  return row?.count === 1;
}