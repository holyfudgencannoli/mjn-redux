import { ScreenPrimative } from "@/components/screen-primative";
import { primary200, primary300, primary700 } from "@/theme/colors/shades";
import { Form } from '@components';
import { useItemService } from "@features/new-item-form/hooks";
import {
  useFocusEffect,
  useIsFocused
} from '@react-navigation/native';
import { Gradients } from "@theme/colors/gradients";
import { useTheme } from "@theme/hooks/use-theme";
import { ItemType } from "@types";
import { CaseHelper } from "@utils/case-helper";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  JSX,
  useCallback,
  useState
} from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Text,
  View
} from 'react-native';
import { Pressable } from "react-native-gesture-handler";

export default function NewItem(): JSX.Element {
	const { items, create } = useItemService();
	const { styles, colors } = useTheme();
  const router = useRouter();

  const { handleSubmit, control, setValue, getValues, reset } = useForm({
    defaultValues: {
      name: '',
      type: '',
      category: '',
      subcategory: ''
    }
  });

  useFocusEffect(
		useCallback(() => {
			return() => {
        reset({
          name: '',
          type: '',
          category: '',
          subcategory: ''
        });
			}
		}, [reset])
	)

  const onSubmit = async(data: any) => {
    const { name, type, category, subcategory } = data;
    const itemNames: string[] = items.map((item: ItemType) => item.name)
    if (itemNames.includes(name)) {
      Alert.alert("Duplicate Item Creation", "Item Already Exists!")
    } else {
      const nowMs: number = new Date().getTime()
      const itemId = await create({
        name, 
        category, 
        subcategory, 
        type, 
        created_at: nowMs, 
        last_updated: nowMs, 
			});
      console.log(`${CaseHelper.toCleanCase(type)} Created. ID: `, itemId)
      Alert.alert("Success", `${CaseHelper.toCleanCase(type)} "${name}" has been created!`)
      router.replace("/")
    }
  };

  const isFocused = useIsFocused();
  // necessary for unmounting and resetting form select
	if (!isFocused) {
			return <></>;
	}

  const randomHexColor = () => {
    return '#000000'.replace(/0/g, function () {
      return Math.round(Math.random() * 16).toString(16);
    });
  };

  const [rippleColor, setRippleColor] = useState(randomHexColor());
  const [rippleOverflow, setRippleOverflow] = useState(false);

  return(
		<View style={{ flex: 1 }}>	
			<LinearGradient
				start={{ x: 1, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={Gradients.layout.primary_background}
				style={{ flex: 1, padding: 24}}
			>
	  	  <ScreenPrimative scroll edges={[]}>
          <Form.Input
            label="Item Name"
            rules={{ required: true }}
            name="name"
            editable
            control={control}
            style={{ inputStyle: { ...styles.form.input }, labelStyle: { ...styles.form.label } }}
          />
          <Form.Label 
            label='Item Type' 
            labelStyle={{ ...styles.form.label, marginVertical: 24 }}
            name='type'
          >
            <Form.Select 
							size='lg' 
							style={{ color: 'white', flex: 1 }} 
							selectedValue={getValues('type')} 
							onValueChange={(value: any) => {setValue('type', value.value)}} 
							placeholder="Select Item Type" 
							options={[
								{ name: 'Raw Material', value: 'raw_materials' },
								{ name: 'Bio Material', value: 'bio_materials' },
								{ name: 'Supply', value: 'consumable_items' },
								{ name: 'Hardware', value: 'hardware_items' },
							]}
						/>
          </Form.Label>
          <Form.Input 
            label="Item Category"
            control={control} 
            name='category' 
            style={{ inputStyle: { width: '100%', backgroundColor: 'transparent', color: 'white', textAlign: 'center', borderBottomColor: 'white', borderBottomWidth: 1, borderRadius: 8, minHeight: 50 }, labelStyle: { ...styles.form.label } }}
          />
          <Form.Input 
            label="Subcategory"
            control={control} 
            name='subcategory' 
            style={{ inputStyle: { width: '100%', backgroundColor: 'transparent', color: 'white', textAlign: 'center', borderBottomColor: primary700, borderBottomWidth: 1, borderRadius: 8, minHeight: 50 }, labelStyle: { ...styles.form.label } }}
          />
          <View style={{ marginTop: 36 }}>
            <Pressable
              onLongPress={() => {
                console.log("Long pressed!")
              }}

              onPress={() => {
                console.log("TouchableRipple Pressed")
                // handleSubmit(onSubmit)
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
				</ScreenPrimative>
			</LinearGradient>	
		</View>
  )

}
