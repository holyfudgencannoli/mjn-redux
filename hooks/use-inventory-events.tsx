import { safeRun, safeSelectAll } from "@db/utils";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";

export type InventoryEventType = "purchase" | "usage" | "adjustment" | string;

export interface InventoryEvent {
  id: number;
  item_id: number;
  type: InventoryEventType;
  quantity: number;
  unit: string | null;
  timestamp: number;
  notes: string | null;
}

export interface RecordInventoryEventParams {
  itemId: number;
  type: InventoryEventType;
  quantity: number;
  unit: string | null;
  timestamp: number;
  notes?: string | null;
}

export interface InventoryEventsServiceApi {
  recordEvent: (params: RecordInventoryEventParams) => Promise<void>;
  getEventsByItem: (itemId: number) => Promise<InventoryEvent[]>;
  getEventsByType: (type: InventoryEventType) => Promise<InventoryEvent[]>;
}

/**
 * useInventoryEventsService
 *
 * Focused hook for working directly with the inventory_events table.
 * Higher-level logic (e.g., calculating stock, daily usage) should live
 * in other hooks/services that can compose this.
 */
export function useInventoryEventsService(): InventoryEventsServiceApi {
  const db = useSQLiteContext() as unknown as SQLiteDatabase;

  const recordEvent = useCallback(
    async ({ itemId, type, quantity, unit, timestamp, notes = null }: RecordInventoryEventParams) => {
      await safeRun(
        db,
        `INSERT INTO inventory_events (item_id, type, quantity, unit, timestamp, notes)
         VALUES (?, ?, ?, ?, ?, ?);`,
        [itemId, type, quantity, unit, timestamp, notes]
      );
    },
    [db]
  );

  const getEventsByItem = useCallback(
    async (itemId: number): Promise<InventoryEvent[]> => {
      return await safeSelectAll<InventoryEvent>(
        db,
        `SELECT id, item_id, type, quantity, unit, timestamp, notes
         FROM inventory_events
         WHERE item_id = ?
         ORDER BY timestamp ASC;`,
        [itemId]
      );
    },
    [db]
  );

  const getEventsByType = useCallback(
    async (type: InventoryEventType): Promise<InventoryEvent[]> => {
      return await safeSelectAll<InventoryEvent>(
        db,
        `SELECT id, item_id, type, quantity, unit, timestamp, notes
         FROM inventory_events
         WHERE type = ?
         ORDER BY timestamp ASC;`,
        [type]
      );
    },
    [db]
  );

  return {
    recordEvent,
    getEventsByItem,
    getEventsByType,
  };
}

export default useInventoryEventsService;