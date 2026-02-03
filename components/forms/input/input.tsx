import { Label } from "@react-navigation/elements";
import { Controller, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { TextInput, TextInputProps, TextStyle, useWindowDimensions, ViewStyle } from "react-native";

interface Props extends Omit<TextInputProps, 'style'> {
  name: string;
  control: any;
  label?: string;
  editable?: boolean;
  style?: {
    labelStyle?: TextStyle;
    inputStyle?: TextStyle & ViewStyle;
  };
  default_value?: string;
  rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  props?: TextInputProps;
};

export default function Input({
  name,
  control,
  label,
  editable = true,
  style,
  default_value,
  rules,
  props
}:Props) {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const window = useWindowDimensions();
  const { labelStyle, inputStyle } = style || {};

  return (
    <>
      {label && <Label style={{...labelStyle, marginVertical: window.width/25}}>{label}</Label>}
      <Controller 
        rules={rules}
        name={name}
        control={control}
        defaultValue={default_value || ''}
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            editable={editable}
            style={inputStyle}
            {...props}
          />
        )}
      />
      
    </>
  );
}
