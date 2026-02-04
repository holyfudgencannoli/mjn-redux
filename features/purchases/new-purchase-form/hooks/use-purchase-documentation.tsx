import { useItemService } from "@/features/inventory/items/new-item-form/hooks";
import { useTheme } from "@theme/hooks/use-theme";
import type { PurchaseType } from "@types";
import { ItemType } from "@types";
import { UnitConversion as cnv } from '@utils/unit-conversion';
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { Alert } from 'react-native';

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


export default function usePurchaseDocumentation() {
	// Hook logic for purchase documentation
	const [logs, setLogs] = useState([]);
	const [isNewItem, setIsNewItem] = useState(true);
	const [vendors, setVendors] = useState([]);
	const [brands, setBrands] = useState([{ id: 0, name: 'Self', value: 0 }]);
	const [isNewVendor, setIsNewVendor] = useState(false)
	const [isNewBrand, setIsNewBrand] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ItemType>()
  const [id, setId] = useState()
  const [image, setImage] = useState(null)
  const[contentType, setContentType] = useState<string | undefined>(undefined);



  const { 
    handleSubmit, 
    setValue, 
    getFieldState,
    watch, 
    getValues,
    subscribe,
    formState: { errors, dirtyFields }, 
    control 
  } = useForm({defaultValues:{
    name: '',
    type: '',
    category: isNewItem ? '' : selectedItem?.category,
    subcategory: isNewItem ? '' : selectedItem?.subcategory,
  }});

  const nameCtrl = useController({
    name: 'name',
    control,
  })
  const typeCtrl = useController({
    name: 'type',
    control,
  })
  const categoryCtrl = useController({
    name: 'category',
    control,
  })
  const subcategoryCtrl = useController({
    name: 'subcategory',
    control,
  })

  // function ctrl(fieldName: string) {
  //   const { field } = useController({
  //     name: fieldName,
  //     control,
  //     defaultValue: '',
  //   });
  //   return field
  // }
  
	const { items, getItems } = useItemService();
  const { colors, styles } = useTheme();
  const formStyles = styles.form;

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
              amount: cnv.convertFromBase(
                cnv.convertToBase(raw, inventoryUnit) + cnv.convertToBase(initialAmount, inventoryUnit),
                baseUnit,
              ),
              unit: baseUnit,
          };
      }
      // No existing unit – keep the inventory unit.
      return { amount: raw, unit: inventoryUnit };
  }

  /**
   * Persist a vendor if it is new; otherwise just return its id.
   */

	return {
		logs, setLogs,
		isNewItem, setIsNewItem,
		vendors, setVendors,
		brands, setBrands,
		items, getItems,
		isNewVendor, setIsNewVendor,
		isNewBrand, setIsNewBrand,
        calculateAmount,
        isDuplicateName,
        abortWithAlert,
        selectedItem, setSelectedItem,
        id, setId,
        image, setImage,
        contentType, setContentType
		// methods and properties
	};
}