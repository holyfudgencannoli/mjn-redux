import { safeRun, safeSelectAll } from "@db/utils";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";

export interface InventoryState {
  id: number;
  item_id: number;
  timestamp: number;
  type: string | null;
  quantity: number | null;
  unit: string | null;
}

export interface RecordInventoryStateParams {
  itemId: number;
  timestamp: number;
  type?: string | null;
  quantity?: number | null;
  unit?: string | null;
}

export interface InventoryStatesServiceApi {
  recordState: (params: RecordInventoryStateParams) => Promise<void>;
  getStatesByItem: (itemId: number) => Promise<InventoryState[]>;
  getLatestStateForItem: (itemId: number) => Promise<InventoryState | null>;
}

/**
 * useInventoryStatesService
 *
 * Focused hook for working directly with the inventory_states table.
 * This is useful for snapshotting computed stock levels and reading them
 * efficiently, separate from the raw inventory_events stream.
 */
export function useInventoryStatesService(): InventoryStatesServiceApi {
  const db = useSQLiteContext() as unknown as SQLiteDatabase;

  const recordState = useCallback(
    async ({ itemId, timestamp, type = null, quantity = null, unit = null }: RecordInventoryStateParams) => {
      await safeRun(
        db,
        `INSERT INTO inventory_states (item_id, timestamp, type, quantity, unit)
         VALUES (?, ?, ?, ?, ?);`,
        [itemId, timestamp, type, quantity, unit]
      );
    },
    [db]
  );

  const getStatesByItem = useCallback(
    async (itemId: number): Promise<InventoryState[]> => {
      return await safeSelectAll<InventoryState>(
        db,
        `SELECT id, item_id, timestamp, type, quantity, unit
         FROM inventory_states
         WHERE item_id = ?
         ORDER BY timestamp ASC;`,
        [itemId]
      );
    },
    [db]
  );

  const getLatestStateForItem = useCallback(
    async (itemId: number): Promise<InventoryState | null> => {
      const rows = await safeSelectAll<InventoryState>(
        db,
        `SELECT id, item_id, timestamp, type, quantity, unit
         FROM inventory_states
         WHERE item_id = ?
         ORDER BY timestamp DESC
         LIMIT 1;`,
        [itemId]
      );

      if (!rows.length) return null;
      return rows[0];
    },
    [db]
  );

  return {
    recordState,
    getStatesByItem,
    getLatestStateForItem,
  };
}

export default useInventoryStatesService;