import * as ItemRepo from "@/features/inventory/items/new-item-form/repo";
import { ItemType } from "@types";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";



export function useItemService() {
  const db = useSQLiteContext() as SQLiteDatabase;

  const create = useCallback(async (params: ItemRepo.ItemCoreFields) => {
    const {
      name,
      category,
      subcategory,
      type,
      created_at,
      par = undefined,
      last_updated,
    } = params;

    return ItemRepo.create(
      db,
      {
        name,
        category,
        subcategory,
        type,
        created_at,
        par,
        last_updated,
      }
    );
  }, [db]);

  const readAll = useCallback(async (): Promise<ItemType[]> => {
    return ItemRepo.readAll(db);
  }, [db]);

  const getById = useCallback(async (id: number): Promise<ItemType | null> => {
    return ItemRepo.getById(db, id);
  }, [db]);

  const getAllByType = useCallback(async (type: string): Promise<ItemType[]> => {
    return ItemRepo.getAllByType(db, type);
  }, [db]);

  const getByName = useCallback(async (name: string): Promise<ItemType | null> => {
    return ItemRepo.getByName(db, name);
  }, [db]);

  const update = useCallback(async ( id: number, data: Partial<ItemRepo.ItemCoreFields>) => {
    return ItemRepo.update(db, id, data);
  }, [db]);

  const destroy = useCallback(async (id: number) => {
    return ItemRepo.destroy(db, id);
  }, [db]);

  const exists = useCallback(async (id: number) => {
    return ItemRepo.exists(db, id);
  }, [db]);

	
  const [items, setItems] = useState<ItemType[]>([]);

	const getItems = useCallback(async () => {
    const rawItems: ItemType[] = await readAll();
    // Normalize to the canonical ItemType shape so downstream consumers
    // (like purchase flows) don't see legacy columns such as amount_on_hand.
    const itemObjs: ItemType[] = rawItems.map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      subcategory: item.subcategory,
      type: item.type,
      created_at: item.created_at,
      par: item.par,
      last_updated: item.last_updated,
    }));
    setItems(itemObjs);
    return itemObjs;
  }, [readAll]);

	const [allCategories, setAllCategories] = useState<string[]>([]);

	const getCategories = useCallback(async () => {
		let categories: string[] = items.map(item => item.category);
		let unique: string[] = [...new Set(categories)];
		setAllCategories(unique);            
		return unique
	}, [])


	useEffect(() => {
		getItems();
		getCategories();
	}, [db]);




  return { 
		create, readAll, getById, getAllByType, getByName, update, destroy, exists,
		items, getItems, allCategories, getCategories

	 };
}

export default useItemService;
