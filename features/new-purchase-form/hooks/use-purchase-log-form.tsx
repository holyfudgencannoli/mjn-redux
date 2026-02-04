import { PurchaseLogType, PurchaseType } from "@types";
import * as cnv from '@utils/unit-conversion';
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import { Alert } from "react-native";
import * as PurchRepo from "../repo/index";


type CreatePurchaseParams = {
  type: PurchaseType<string>;
  item_id: number;
  created_at: number;
  purchase_date: number | string;
  purchase_unit: string;
  purchase_amount: number;
  inventory_unit?: string | null;
  inventory_amount?: number | null;
  vendor_id?: number | null;
  brand?: number | null;
  receipt_uri?: string | null;
  cost?: number | null;
};

type UpdatePurchaseParams = {
  id: number;
  type: PurchaseType<string>;
  item_id: number;
  created_at: number;
  purchase_date: number | string;
  purchase_unit: string;
  purchase_amount: number;
  inventory_unit?: string | null;
  inventory_amount?: number | null;
  vendor_id?: number | null;
  brand?: number | null;
  receipt_uri?: string | null;
  cost?: number | null;
};

export function usePurchaseLogForm() {
  const db = useSQLiteContext() as unknown as SQLiteDatabase;



const NEW_ID = 999_999;   // value used by the picker for “New …”
const SELF_ID = 0;        // value used by the picker for “Self”




/**
 * Show an alert and return true if we should abort the submit flow.
 */
function abortWithAlert(title: string, message: string): boolean {
    Alert.alert(title, message);
    return true;
}

/**
 * Check if a name already exists in a list of objects that have a `name` field.
 */
function isDuplicateName<T extends { name: string }>(
    items: T[],
    nameToCheck: string
): boolean {
    return items.some((item) => item.name.toLowerCase() === nameToCheck.trim().toLowerCase());
}

/**
 * Convert purchase + inventory quantities into the unit used by the item.
 */
function calculateAmount(
    baseUnit: string,
    purchaseQty: number,
    inventoryQty: number,
    initialAmount: number,
    inventoryUnit: string
): { amount: number; unit: string } {
    const raw = purchaseQty * inventoryQty;
    // If we already have an inventory unit, convert to that unit.
    if (baseUnit) {
        return {
            amount: cnv.convertFromBase({
                value: cnv.convertToBase({ value: raw, from: inventoryUnit }) + cnv.convertToBase({ value: initialAmount, from: inventoryUnit }),
                to: baseUnit,
            }),
            unit: baseUnit,
        };
    }
    // No existing unit – keep the inventory unit.
    return { amount: raw, unit: inventoryUnit };
}

/**
 * Persist a brand if it is new; otherwise just return its id.
 */

/**
 * Persist a vendor if it is new; otherwise just return its id.
//  */
// async function getOrCreateVendor(
//     db: SQLiteDatabase,
//     state: VendorFormState,
//     currentId?: number
// ): Promise<number> {
//     if (currentId && currentId !== NEW_ID && currentId !== SELF_ID) return currentId;

//     const vendorId = await vendorService.create(
//         db,
//         state.name,
//         state.email,
//         state.phone,
//         state.address,
//         state.contactName,
//         state.website,
//         Date.now(),
//     );
// return vendorId;
// }



  const create = useCallback(async (params: CreatePurchaseParams) => {
    const {
      type,
      item_id,
      created_at,
      purchase_date,
      purchase_unit,
      purchase_amount,
      inventory_unit = null,
      inventory_amount = null,
      vendor_id = null,
      brand = null,
      receipt_uri = null,
      cost = null,
    } = params;

    return PurchRepo.create(
      db,
      type as string,
      item_id,
      created_at,
      (purchase_date as any),
      purchase_unit,
      purchase_amount,
      inventory_unit as any,
      inventory_amount as any,
      vendor_id as any,
      brand as any,
      receipt_uri as any,
      cost as any
    );
  }, [db]);

  const readAll = useCallback(async (): Promise<PurchaseLogType[]> => {
    return PurchRepo.readAll<PurchaseLogType>(db);
  }, [db]);

  const getAllByType = useCallback(async (type: PurchaseType<string>): Promise<PurchaseLogType[]> => {
    return PurchRepo.getAllByType<PurchaseLogType>(db, type as string);
  }, [db]);

  const getById = useCallback(async (id: number): Promise<PurchaseLogType | null> => {
    return PurchRepo.getById(db, id);
  }, [db]);

  const getByItemId = useCallback(async (type: PurchaseType<string>, item_id: number): Promise<PurchaseLogType[]> => {
    return PurchRepo.getByItemId(db, type, item_id);
  }, [db]);

  const update = useCallback(async (params: UpdatePurchaseParams) => {
    const {
      type,
      id,
      item_id,
      created_at,
      purchase_date,
      purchase_unit,
      purchase_amount,
      inventory_unit = null,
      inventory_amount = null,
      vendor_id = null,
      brand = null,
      receipt_uri = null,
      cost = null,
    } = params;

    return PurchRepo.update(
      db,
      type as string,
      id,
      item_id,
      created_at,
      (purchase_date as any),
      purchase_unit,
      purchase_amount,
      inventory_unit as any,
      inventory_amount as any,
      vendor_id as any,
      brand as any,
      receipt_uri as any,
      cost as any
    );
  }, [db]);

  const destroy = useCallback(async (id: number) => {
    return PurchRepo.destroy(db, "", id); // repo signature has type param but deletes by id only; passing empty type
  }, [db]);

  const exists = useCallback(async (type: PurchaseType<string>, id: number) => {
    return PurchRepo.exists(db, type as string, id);
  }, [db]);

  return { create, readAll, getAllByType, getById, getByItemId, update, destroy, exists,
		abortWithAlert
	 };
}

export default usePurchaseLogForm;