export interface TaskType {
  id: number;
  name: string;
  start: number;
  end: number;
  notes: string | null;
}

export type TimeType = "recipe" | "culture" | "maintenance" | string;


export type TimePairType = {
  id: string;
  startTime: Date;
  endTime: Date;
  category: TimeType;
};