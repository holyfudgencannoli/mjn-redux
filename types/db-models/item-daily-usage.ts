export interface ItemDailyUsageType {
  id: number;
  item_id: number;
  date: number;
  usage_amount: number;
  usage_unit: string | null;
}
