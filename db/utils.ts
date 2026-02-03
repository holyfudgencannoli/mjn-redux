import { SQLiteBindParams, SQLiteDatabase } from "expo-sqlite";

export async function safeExec(db: SQLiteDatabase, query: string) {
  try {
    console.log("Running query:", query);
    await db.execAsync(query);
    console.log("✅ Success");
  } catch (err) {
    console.error("❌ Error running query:", query, err);
    throw err; // optional, to stop further migration
  }
}

export async function safeRun(db: SQLiteDatabase, query: string, params: SQLiteBindParams) {
  try {
    console.log("Running query:", query);
    const result = await db.runAsync(query, params);
    console.log("✅ Success");
    return result
  } catch (err) {
    console.error("❌ Error running query:", query, err);
    throw err; // optional, to stop further migration
  }
}

export async function safeSelect<T>(
  db: SQLiteDatabase,
  sql: string,
  params: SQLiteBindParams
): Promise<T[]> {
  try {
    console.log("➡️ SELECT:", sql, params);
    return await db.getAllAsync<T>(sql, params);
  } catch (e) {
    console.error("❌ SELECT ERROR:", sql, params, e);
    throw e;
  }
}

export async function safeSelectOne<T>(
  db: SQLiteDatabase,
  sql: string,
  params: SQLiteBindParams
): Promise<T | null> {
  const rows = await safeSelect<T>(db, sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export async function safeSelectAll<T>(db: SQLiteDatabase, query: string, params: any[] = []) {
  try {
    console.log("Running query:", query, params);
    const rows = await db.getAllAsync<T>(query, params);
    console.log("✅ SELECT success");
    return rows;
  } catch (err) {
    console.error("❌ SELECT error:", query, params, err);
    throw err;
  }
}

// src/db/index.ts
import * as SQLite from 'expo-sqlite';

const DB_NAME = 'mycologger.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;
let isOpen = false;

// Internal promise for async open
let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;


// /**
//  * Async getter — safe for utils, hooks, effects, backup, etc.
//  */
// export const useSQLiteContext = async (): Promise<SQLite.SQLiteDatabase> => {
//   if (dbInstance) return dbInstance;

//   if (!dbPromise) {
//     dbPromise = (async () => {
//       const db = await SQLite.openDatabaseAsync(DB_NAME);
//       await db.execAsync(`
//         PRAGMA journal_mode = WAL;
//         PRAGMA foreign_keys = ON;
//         PRAGMA cache_size = -20000; -- 20 MB cache
//       `);
//       dbInstance = db;
//       isOpen = true;
//       console.log('SQLite database opened:', DB_NAME);
//       return db;
//     })();
//   }

//   return await dbPromise;
// };

/**
 * Close DB safely for backup/restore
 */
export const checkpointAndCloseForBackup = async () => {
  if (!dbInstance || !isOpen) return;

  try {
    console.log('Checkpointing and closing DB for backup...');
    await dbInstance.execAsync('PRAGMA wal_checkpoint(FULL);');
  } catch (e) {
    console.warn('Checkpoint failed (usually safe):', e);
  }

  await dbInstance.closeAsync();
  dbInstance = null;
  isOpen = false;
  dbPromise = null;
};

export function getAllRows<T = any>(db: SQLiteDatabase, table: string): T[] {
  return db.getAllSync<T>(`SELECT * FROM ${table};`);
}

export function getRowsWhere<T = any>(
  db: SQLiteDatabase,
  table: string,
  where: string,
  params: any[] = []
): T[] {
  return db.getAllSync<T>(
    `SELECT * FROM ${table} WHERE ${where};`,
    params
  );
}

export function createTable(db: SQLiteDatabase, sql: string) {
  db.execSync(`CREATE TABLE IF NOT EXISTS ${sql};`);
}

export function insertRow(
  db: SQLiteDatabase,
  table: string,
  data: Record<string, any>
) {
  const keys = Object.keys(data);
  const placeholders = keys.map(() => "?").join(", ");

  const sql = `
    INSERT INTO ${table} (${keys.join(", ")})
    VALUES (${placeholders});
  `;

  db.runSync(sql, Object.values(data));
}

export function copyTableData({
  db,
  sourceTable,
  targetTable,
  transform,
}: {
  db: SQLiteDatabase;
  sourceTable: string;
  targetTable: string;
  transform?: (row: any) => Record<string, any>;
}) {
  const rows = getAllRows(db, sourceTable);

  db.execSync("BEGIN TRANSACTION;");

  try {
    for (const row of rows) {
      const data = transform ? transform(row) : row;
      insertRow(db, targetTable, data);
    }

    db.execSync("COMMIT;");
  } catch (err) {
    db.execSync("ROLLBACK;");
    throw err;
  }
}

export function renameTable(
  db: SQLiteDatabase,
  oldName: string,
  newName: string
) {
  db.execSync(`
    ALTER TABLE ${oldName}
    RENAME TO ${newName};
  `);
}

export function dropTable(db: SQLiteDatabase, table: string) {
  db.execSync(`DROP TABLE IF EXISTS ${table};`);
}


export function replaceTable({
  db,
  oldTable,
  tempTable,
}: {
  db: SQLiteDatabase;
  oldTable: string;
  tempTable: string;
}) {
  db.execSync("BEGIN TRANSACTION;");

  try {
    dropTable(db, oldTable);
    renameTable(db, tempTable, oldTable);
    db.execSync("COMMIT;");
  } catch (err) {
    db.execSync("ROLLBACK;");
    throw err;
  }
}



export async function deleteEverything(db: SQLiteDatabase) {
  await safeExec(db,
    `DROP TABLE IF EXISTS items;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS purchase_logs;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS usage_logs;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS recipes;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS recipe_batches;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS recipe_batch_inventory_logs;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS recipe_batch_usage_logs;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS cultures;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS sterilizations;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS inoculations;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS germinations;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS colonizations;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS contaminations;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS harvests;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS tasks;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS vendors;`
  )
  await safeExec(db,
    `DROP TABLE IF EXISTS brands;`
  )
}


/**
 * Check if DB is open
 */
export const isDatabaseOpen = () => isOpen;
