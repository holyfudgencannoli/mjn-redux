import { Form } from '@/components';
import { useItemService } from "@/features/inventory/items/new-item-form/hooks";
import { useVendorService } from "@/features/vendors/new-vendor-form";
import { primary200, primary300 } from '@/theme/colors/shades';
import { saveReceiptWithSAF } from '@adapters/file-system';
import { ReceiptUploader } from '@components';
import { ScreenPrimative } from "@components/screen-primative";
import { INV_UNITS, PUR_UNITS } from '@constants';
import useInventoryEventsService from '@hooks/use-inventory-events';
import useInventoryStatesService from '@hooks/use-inventory-states';
import { Gradients } from '@theme/colors';
import { useTheme } from "@theme/hooks/use-theme";
import { VendorType } from '@types';
import { CaseHelper } from '@utils/case-helper';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { usePurchaseLogForm } from "../hooks";
import usePurchaseDocumentation from "../hooks/use-purchase-documentation";


export default function NewPurchaseFormScreen() {

  const { styles, colors } = useTheme();
  const vendorService = useVendorService();
  const formStyles = styles.form;

  // Single shared instance of the purchase documentation hook
  const purchaseDocs = usePurchaseDocumentation();
  const {
    logs, setLogs,
    isNewItem, setIsNewItem,
    vendors, setVendors,
    brands, setBrands,
    items, getItems,
    id, setId,
    isNewVendor, setIsNewVendor,
    isNewBrand, setIsNewBrand,
    selectedItem, setSelectedItem,
    abortWithAlert,
    calculateAmount,
    isDuplicateName,
    image,
    setImage,
    contentType,
    setContentType,
  } = purchaseDocs;
 
  const { 
    register, 
    setValue, 
    handleSubmit, 
    getValues, 
    control, 
    reset, 
    formState: { errors, dirtyFields, isValid } 
  } = useForm();

  const Inventory = useInventoryStatesService();
  const Event = useInventoryEventsService();
  const PurchaseLogForm = usePurchaseLogForm();


  const values = getValues();
  
 
    const { name, category, subcategory, type } = values;


    		// Form component logic
    const [brand, setBrand] = useState(null)
    const [vendor, setVendor] = useState<VendorType>({} as VendorType)



    const itemService = useItemService()
    const { navigate } = useRouter();
    

		const onSubmit = async (data: any) => {
			try {

        console.log("[NewPurchaseLog] onSubmit called with data:", data);
        console.log("[NewPurchaseLog] initial context:", {
          isNewItem,
          isNewVendor,
          isNewBrand,
          selectedItem,
          id,
          itemsCount: items?.length,
          vendorsCount: vendors?.length,
          brandsCount: brands?.length,
          DocsImage: image,
          vendorState: vendor,
        });

        /* ---------- 1. Validation ---------- */
        console.log("[NewPurchaseLog] Step 1: Validation");
      			if (!image) return abortWithAlert("Error", `Please select a receipt image: ${image}`);

				// Duplicate checks – only run when creating new entities.
        if (isNewItem && isDuplicateName(items, data.name)) {
          console.log("[NewPurchaseLog] Duplicate item name detected", { name: data.name });
          return abortWithAlert("Duplicate Item Creation", "Item Already Exists!");
        }

        if (isNewVendor && isDuplicateName(vendors, vendor.name)) {
          console.log("[NewPurchaseLog] Duplicate vendor name detected", { vendorName: vendor.name });
          return abortWithAlert("Duplicate Vendor Creation", "Vendor Already Exists!");
        }

        /* ---------- 2. Resolve IDs ---------- */
        const createdAt = Date.now();
        console.log("[NewPurchaseLog] Step 2: Resolve IDs. createdAt:", createdAt);

        // Brand & Vendor – create if needed.
        console.log("[NewPurchaseLog] Resolving vendorId with state:", { vendor, isNewVendor, dataVendorName: data.vendor_name });
        let vendorId = 0;
        if (vendor?.id === 999999) {
          // New vendor selected in the picker
          vendorId = await vendorService.create({
            name: data.vendor_name, 
            contact_name: data.contact_name, 
            email: data.email, 
            phone: data.phone, 
            address: data.address, 
            website: data.website,
            last_updated: createdAt
          });
        } else if (vendor?.id && vendor.id !== 0) {
          // Existing vendor – just use its id
          vendorId = vendor.id;
        }
				console.log("[NewPurchaseLog] Resolved vendorId:", vendorId);

				/* ---------- 3. Item handling ---------- */
				let itemId: number;
				let amountOnHand: number;
				let inventoryUnitUsed: string;
				console.log("[NewPurchaseLog] Step 3: Item handling. Branch info:", { id, isNewItem, selectedItem });

        if (isNewItem === false) {
					// Existing item – update its quantity
          selectedItem && console.log("[NewPurchaseLog] Existing selected item:", selectedItem);
					const existing = await Inventory.getLatestStateForItem(selectedItem?.id as number);
            console.log("[NewPurchaseLog] Existing inventory state for item:", { selectedItem, existing });
					const { amount, unit } = calculateAmount(
						existing?.unit ?? "",
						parseFloat(data.purchase_quantity),
						parseFloat(data.inventory_quantity),
            existing?.quantity ?? 0,
						data.inventory_unit
					);
          console.log("[NewPurchaseLog] Calculated amount for existing item:", {
            baseUnit: existing?.unit ?? "",
            purchase_quantity: parseFloat(data.purchase_quantity),
            inventory_quantity: parseFloat(data.inventory_quantity),
            previousQuantity: existing?.quantity ?? 0,
            inventory_unit: data.inventory_unit,
            amount,
            unit,
          });

					await Inventory.recordState({
						itemId: selectedItem?.id as number,
            type: 'purchase',
						quantity: amount,
						unit: unit,
						timestamp: createdAt,
					});
            console.log("[NewPurchaseLog] Recorded inventory state for existing item:", {
						itemId: selectedItem?.id as number,
            type: 'purchase',
						quantity: amount,
						unit: unit,
						timestamp: createdAt,
					});
          await Event.recordEvent({
						itemId: selectedItem?.id as number,
            type: 'purchase',
						quantity: 
						parseFloat(data.purchase_quantity) *
						parseFloat(data.inventory_quantity),
						unit: data.inventory_unit,
						timestamp: createdAt,
            notes: `Inventory addition via purchase log.`,
					});
            console.log("[NewPurchaseLog] Recorded inventory event for existing item:", {
						itemId: selectedItem?.id as number,
            type: 'purchase',
						quantity: 
						parseFloat(data.purchase_quantity) *
						parseFloat(data.inventory_quantity),
						unit: data.inventory_unit,
						timestamp: createdAt,
            notes: `Inventory addition via purchase log.`,
					});


					itemId = selectedItem?.id as number;
					amountOnHand = amount;
					inventoryUnitUsed = unit;
            console.log("[NewPurchaseLog] Existing item branch complete:", {
            itemId,
            amountOnHand,
            inventoryUnitUsed,
            vendorId,
          });

				} else {
					// New item – create it.
          console.log("[NewPurchaseLog] New item branch. Calculating amount for new item.");
					const { amount, unit } = calculateAmount(
						"",
						parseFloat(data.purchase_quantity),
						parseFloat(data.inventory_quantity),
            0,
						data.inventory_unit
					);
          console.log("[NewPurchaseLog] Calculated amount for new item:", {
            purchase_quantity: parseFloat(data.purchase_quantity),
            inventory_quantity: parseFloat(data.inventory_quantity),
            initialAmount: 0,
            inventory_unit: data.inventory_unit,
            amount,
            unit,
          });

					itemId = await itemService.create({
						name: data.name,
						category: data.category,
						subcategory: data.subcategory,
						type: data.type,
            created_at: createdAt,
						par: 0,
						last_updated: createdAt,
					});
          console.log("[NewPurchaseLog] Created new item with itemId:", itemId, "and payload:", {
            name: data.name,
            category: data.category,
            subcategory: data.subcategory,
            type: data.type,
            created_at: createdAt,
            par: 0,
            last_updated: createdAt,
          });

          await Inventory.recordState({
						itemId: itemId,
            type: 'purchase',
						quantity: amount,
						unit: unit,
						timestamp: createdAt,
					});
            console.log("[NewPurchaseLog] Recorded inventory state for new item:", {
						itemId: itemId,
						quantity: amount,
						unit: unit,
						timestamp: createdAt,
					})

          
          await Event.recordEvent({
						itemId: itemId,
            type: 'purchase',
						quantity: 
						parseFloat(data.purchase_quantity) *
						parseFloat(data.inventory_quantity),
						unit: data.inventory_unit,
						timestamp: createdAt,
            notes: `Inventory addition via purchase log.`,
					});
            console.log("[NewPurchaseLog] Recorded inventory event for new item:", {
						itemId: itemId,
              type: 'purchase',
						quantity: 
						parseFloat(data.purchase_quantity) *
						parseFloat(data.inventory_quantity),
						unit: data.inventory_unit,
						timestamp: createdAt,
            notes: `Inventory addition via purchase log.`,
					})

					amountOnHand = amount;
					inventoryUnitUsed = unit;
            console.log("[NewPurchaseLog] New item branch complete:", {
            itemId,
            amountOnHand,
            inventoryUnitUsed,
            vendorId,
          });

				}

        /* ---------- 4. Persist receipt image ---------- */
        console.log("[NewPurchaseLog] Step 4: Persist receipt image. image:", image);
        const receiptPath = await saveReceiptWithSAF(image, `receipt_image_${createdAt}`);
				console.log("[NewPurchaseLog] Receipt saved at path:", receiptPath);

				/* ---------- 5. Create purchase log ---------- */
				console.log("[NewPurchaseLog] Step 5: Create purchase log with payload:", {
					type: data.type,
					item_id: itemId ?? 0,
					created_at: createdAt,
					purchase_date: new Date().getTime(),
					purchase_unit: data.purchase_unit,
					purchase_amount: parseFloat(data.purchase_quantity),
					inventory_unit: data.inventory_unit,
					inventory_amount: parseFloat(data.inventory_quantity),
          vendor_id: vendorId,
          brand: data.brand || '',
					receipt_uri: receiptPath,
					cost: parseFloat(data.cost),
				});
				await PurchaseLogForm.create({
          type: data.type,
          item_id: itemId??0,
          created_at: createdAt,
          purchase_date: new Date().getTime(),
          purchase_unit: data.purchase_unit,
          purchase_amount: parseFloat( data.purchase_quantity),
          inventory_unit: data.inventory_unit,
          inventory_amount: parseFloat(data.inventory_quantity),
            vendor_id: vendorId,
            brand: data.brand || '',
          receipt_uri: receiptPath,
          cost: parseFloat(data.cost)
        });
	        console.log("[NewPurchaseLog] Purchase log created successfully.");

				/* ---------- 6. Success & navigation ---------- */
				console.log(
					`Success! ${data.purchase_quantity} ${data.purchase_unit} of ${CaseHelper.toCleanCase(data.type)} ${data.name} added to your inventory. Great Work!`
        )
        Alert.alert("Success", `${CaseHelper.toCleanCase(type)} "${data.name}" has been created!`)
        navigate("/")
			} catch (error) {
				console.error(error);
				Alert.alert("Unexpected error", "Something went wrong while saving the purchase log.");
			}
		};

    // const categoryValue = watch('category');
    // console.log("Category changed:", categoryValue);

    return(
      <View 
        style={{ flex: 1 }}
        // style={CONTAINER.FULL}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0.3, y: 0.9 }}
          colors={Gradients.layout.primary_background}
          style={{ flex: 1, padding: 16}}
        >
          <ScreenPrimative edges={[]} scroll>
            <View>
                <Form.Select
                  style={{ color: 'rgba(255, 0, 155, 1)', width: '95%', margin: 'auto', justifyContent: 'center'  }}
                  type='above'
                  size='lg'
                  onValueChange={(value: any) => {
                    if (value.id === 999999) {
                      setIsNewItem(true)
                      setSelectedItem(undefined)
                      setValue('id', '')
                      setValue('name', '')
                      setValue('type', '')
                      setValue('category', '')
                      setValue('subcategory', '')
                    } else {
                      console.log(value)
                      setIsNewItem(false)
                      setSelectedItem(value)
                      setValue('id', value.id)
                      setValue('type', value.type)
                      setValue('name', value.name)
                      setValue('category', value.category)
                      setValue('subcategory', value.subcategory)
                    }
                  }}    
                  options={[{ id: 999999, name: 'New Item'},...items]}
                />
              {/* </Form.Label> */}
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Form.Input
                  label='Item Name'
                  rules={{ required: true }}
                  style={{ 
                    labelStyle: formStyles.label,
                    inputStyle: {...formStyles.input, width: '85%'},

                  }}
                  name="name"
                  control={control}
                  editable={isNewItem}
                />
                {isNewItem ? 
                <>
                  <Form.Label label='Item Type' labelStyle={formStyles.label} />
                  <Form.Select
                    type='embed'
                    style={{ width: '85%', backgroundColor: 'transparent' }} 
                    placeholder="Select Item Type"
                    options={[
                      {name: 'Raw Materials', value: 'raw_materials' },
                      {name: 'Biologics', value: 'bio_materials' },
                      {name: 'Hardware', value: 'hardware_items' },
                      {name: 'Supplies', value: 'consumable_items' },
                    ]}
                    onValueChange={(value: any) => {
                      if (!isNewItem) return;
                      setValue('type', value.value)
                      console.log(value.value)
                    }}
                  /> 
                </>:
                <Form.Input
                  rules={{ required: true }}
                  style={{ 
                    inputStyle: formStyles.input,
                    labelStyle: formStyles.label
                  }}
                  label="Item Type"
                  name="type"
                  control={control}
                  editable={isNewItem}

                />
                  }
                <Form.Input
                  rules={{ required: true }}
                  style={{ 
                    labelStyle: formStyles.label,
                    inputStyle: formStyles.input
                  }}
                  label="Category"
                  name="category"
                  control={control}
                  editable={isNewItem}
                  default_value={isNewItem ? "" : selectedItem?.category}
                />
                <Form.Input
                  rules={{ required: true }}
                  style={{ 
                    inputStyle: formStyles.input,
                    labelStyle: formStyles.label
                  }}
                  label="Subcategory"
                  name="subcategory"
                  control={control}
                  editable={isNewItem}
                  default_value={isNewItem ? "" : selectedItem?.subcategory}
                />
                <Form.Label style={formStyles.label}>
                  Brand
                </Form.Label>        
                <Form.Select
                  type='embed'
                  size="sm" 
                  style={{ width: '85%', backgroundColor: 'transparent' }}
                  onValueChange={(value: any)=> {
                    if (value.id === 999999) {
                      setBrand(null)
                      setIsNewBrand(true)
                    } else{
                      setBrand(value)
                      setIsNewBrand(false)
                    }
                  }}
                  options={brands}
                />
                {/* {
                    newBrand ? 
                    <NewBrandForm /> :
                    <></>
                } */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 }}>
                  <Form.Label style={formStyles.label}>
                    Purchase Quantity
                  </Form.Label>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Form.Input
                    rules={{ required: true }}
                    name="purchase_quantity"
                    control={control}
                    editable
                    style={{ 
                      labelStyle: formStyles.label,
                      inputStyle: { 
                        // ...formStyles.input,
                        width: '50%',
                        fontSize: 18,
                        borderBottomWidth: 1,
                        borderColor: 'white',
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 'auto',
                        color: 'white',
                        textAlign: 'center',
                      }
                    }}
                  />
                  <Form.Select
                    style={{ width: '50%', backgroundColor: 'transparent', fontSize: 24 }} 
                    placeholder="Select Unit"
                    options={[...PUR_UNITS]}
                    onValueChange={(value: any) => {
                      setValue('purchase_unit', value.value)
                      console.log(value.value)
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 }}>
                  <Form.Label style={formStyles.label}>
                    Inventory Quantity
                  </Form.Label>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Form.Input
                    rules={{ required: true }}
                    name="inventory_quantity"
                    editable
                    control={control}
                    style={{ 
                      labelStyle: formStyles.label,
                      inputStyle: { 
                        // ...formStyles.input,
                        width: '50%',
                        fontSize: 18,
                        borderBottomWidth: 1,
                        borderColor: 'white',
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 'auto',
                        color: 'white',
                        textAlign: 'center',
                        // minHeight: 50,
                      }
                    }}
                  />
                  <Form.Select
                    style={{ width: '50%', backgroundColor: 'transparent' }} 
                    placeholder="Select Unit"
                    options={[...INV_UNITS]}
                    onValueChange={(value: any) => {
                      setValue('inventory_unit', value.value)
                      console.log(value.value)
                    }}
                  />
                </View>
                <Form.Input
                  rules={{ required: true }}
                  name="cost" 
                  label="Cost"
                  control={control}
                  style={{ 
                    labelStyle: formStyles.label,
                    inputStyle: formStyles.input
                  }}
                />
                <Form.Label 
                  name="vendor" 
                  label="Vendor"
                  labelStyle={formStyles.label} 
                >
                  <Form.Select 
                    type='above'
                    style={{ width: '100%', backgroundColor: 'transparent' }}
                    onValueChange={(value: any)=> {
                      if (value.id === 999999) {
                        setVendor({} as VendorType)
                        setIsNewVendor(true)
                      } else{
                        setVendor(value)
                        setIsNewVendor(false)
                      }
                    }}    
                    options={vendors}
                  />
                </Form.Label>
                {
                    isNewVendor ? 
                      <View>
                        <LinearGradient
                            start={{ x: 0.4, y: 0 }}
                            end={{ x: 0.5, y: 0.9 }}
                            colors={['#0f8', '#80f', '#f80']}
                            style={{ padding: 16, borderRadius: 4, margin: 4}}
                        >
                      
                          <Form.Input
                              rules={{ required: false }}
                              editable
                              name='vendor_name'
                              label='Vendor Name'
                              control={control}
                              style={{ 
                                labelStyle: formStyles.label,
                                inputStyle: { 
                                  ...formStyles.input,
                                  width: '100%',
                                }
                              }}
                          />
                          <Form.Input
                              rules={{ required: false }}
                              editable
                              name='vendor_email'
                              label='Vendor Contact Email'
                              control={control}
                              style={{ 
                                labelStyle: formStyles.label,
                                inputStyle: { 
                                  ...formStyles.input,
                                  width: '100%',
                                }
                              }}
                          />
                      
                          <Form.Input
                              rules={{ required: false }}
                              editable
                              name='vendor_phone'
                              label='Vendor Contact Phone'
                              control={control}
                              style={{ 
                                labelStyle: formStyles.label,
                                inputStyle: { 
                                  ...formStyles.input,
                                  width: '100%',
                                }
                              }}
                          />
                      
                          <Form.Input
                              rules={{ required: false }}
                              editable
                              name='vendor_address'
                              label='Vendor Address'
                              control={control}
                              style={{ 
                                labelStyle: formStyles.label,
                                inputStyle: { 
                                  ...formStyles.input,
                                  width: '100%',
                                }
                              }}
                              multiline
                          />
                          
                          <Form.Input
                              rules={{ required: false }}
                              editable
                              name='vendor_contact'
                              label='Vendor Contact Name'
                              control={control}
                              style={{ 
                                labelStyle: formStyles.label,
                                inputStyle: { 
                                  ...formStyles.input,
                                  width: '100%',
                                }
                              }}
                          />
                          <Form.Input
                            rules={{ required: false }}
                            editable
                            label='Vendor Website'
                            name='vendor_website'
                            control={control}
                            style={{ 
                              labelStyle: formStyles.label,
                              inputStyle: { 
                                ...formStyles.input,
                                width: '100%',
                              }
                            }}
                          />
                      </LinearGradient>
                    </View> :
                    <></>
                }
                <Form.Input
                  props={{ multiline: true }}
                  control={control}
                  name='notes'
                  label="Notes" 
                  style={{ 
                    labelStyle: formStyles.label,
                    inputStyle: { 
                      // ...formStyles.input,
                      width: '85%',
                      borderWidth: 1,
                      borderRadius: 8,
                      minHeight: 100,
                      borderColor: 'white',
                      textAlignVertical: 'top',
                    }
                  }}
                />
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.3, y: 0.9 }}
                  colors={["#1e3c72", "#2a5298"]
                      // COLORS.BACKGROUND_GRADIENT.PRIMARY  
                  }
                  style={{ flex: 1, width: '100%', marginVertical: 16, padding: 8, borderRadius: 8 }}
                >
                  <ReceiptUploader
            docsService={purchaseDocs}
            />
                </LinearGradient>
              </View>

              <View style={{ marginVertical: 84 }}>
                <Pressable
                  onLongPress={() => {
                    console.log("Long pressed!")
                  }}

                  onPress={() => {
                    console.log("TouchableRipple Pressed")
                    handleSubmit(onSubmit)
                  }}
                  android_ripple={ { color: colors.accentHover } }
                  style={{ marginBottom: 16, padding: 16, backgroundColor: colors.buttonPrimary, borderRadius: 8, alignItems: 'center', width: '35%', margin: 'auto', marginVertical: 24 }}
                  
                >
                  <Text
                    style={{ color: primary200, fontSize: 16, fontWeight: 'bold', textShadowColor: primary300, textShadowRadius: 8 }}
                  >
                    Submit Form
                  </Text>
                </Pressable>
              </View>
          </View>                            
        </ScreenPrimative>
      </LinearGradient>
    </View>
  )
}

const styles_scoped = StyleSheet.create({
  input: {
    backgroundColor: 'transparentfef',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
    width: '100%', color: 'white'
  },
})
