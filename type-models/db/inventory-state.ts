export interface InventoryStateType {
  id: number;
  item_id: number;
  timestamp: number;
  type: string | null;
  quantity: number | null;
  unit: string | null;
}
