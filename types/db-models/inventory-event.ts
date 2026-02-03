export type InventoryEventType = 'purchase' | 'usage' | 'adjustment' | string;

export interface InventoryEventRowType {
  id: number;
  item_id: number;
  type: InventoryEventType;
  quantity: number;
  unit: string | null;
  timestamp: number;
  notes: string | null;
}
