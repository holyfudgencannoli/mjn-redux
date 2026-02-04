import { VendorRepo } from "@/features/vendors/new-vendor-form";
import { VendorType } from "@types";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";

type CreateVendorParams = {
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  contact_name?: string | null;
  website?: string | null;
  last_updated: number;
};

export function useVendorService() {
  const db = useSQLiteContext() as unknown as SQLiteDatabase;
    

  const create = useCallback(async (params: CreateVendorParams) => {
    const {
      name,
      email = null,
      phone = null,
      address = null,
      contact_name = null,
      website = null,
      last_updated,
    } = params;

    return VendorRepo.create(db, name, email as any, phone as any, address as any, contact_name as any, website as any, last_updated);
  }, [db]);

  const readAll = useCallback(async (): Promise<VendorType[]> => {
    return VendorRepo.readAll(db);
  }, [db]);

  const getById = useCallback(async (id: number): Promise<VendorType | null> => {
    return VendorRepo.getById(db, id);
  }, [db]);

  const getByName = useCallback(async (name: string): Promise<VendorType | null> => {
    return VendorRepo.getByName(db, name);
  }, [db]);

  const update = useCallback(async (id: number, name: string, email: string | null, phone: string | null, address: string | null, contact_name: string | null, website: string | null, last_updated: number) => {
    return VendorRepo.update(db, id, name, email as any, phone as any, address as any, contact_name as any, website as any, last_updated);
  }, [db]);

  const destroy = useCallback(async (id: number) => {
    return VendorRepo.destroy(db, id);
  }, [db]);

  const exists = useCallback(async (id: number) => {
    return VendorRepo.exists(db, id);
  }, [db]);

  return { create, readAll, getById, getByName, update, destroy, exists };
}

export default useVendorService;