export interface CultureType {
  id: number;
  type: string | null;
  status: string | null;
  created_at: number;
  recipe_batch_id: number;
  amount: number;
  unit: string;
  last_updated: number;
  sterilized_id: number | null;
  inoculated_id: number | null;
  germinated_id: number | null;
  colonized_id: number | null;
  contaminated_id: number | null;
  harvested_id: number | null;
}
