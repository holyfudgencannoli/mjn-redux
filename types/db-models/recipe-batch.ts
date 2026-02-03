export interface RecipeBatchType {
  id: number;
  recipe_id: number;
  real_item_id: number | null;
  real_volume: number;
  real_volume_unit: string;
  quantity: number;
  real_weight: number;
  real_weight_unit: string;
  loss: number;
  name: string;
  notes: string | null;
  created_at: number;
}
