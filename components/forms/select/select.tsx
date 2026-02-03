// src/components/Select/Select.tsx
import { useColors } from '@/constants/theme/colors';
import { useSpacing } from '@/constants/theme/spacing';
import { useTypography } from '@/constants/theme/typography';
import { Picker } from '@react-native-picker/picker';
import React, { forwardRef } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

export interface Option {
  name: string;
  value: string | number;
}

export interface SelectProps {
  options: any[];
  selectedValue?: string | number;
  onValueChange: (value: any, index: number) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle & TextStyle;
  type?: 'embed' | 'above';
}

const Select = forwardRef<View, SelectProps>((props, ref) => {
  const { options, selectedValue, onValueChange, placeholder, size = 'md', style, type = 'above' } = props;
  const spacing = useSpacing();
  const typography = useTypography();
  const colors = useColors();


  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 4,
      paddingHorizontal: spacing.sm,
      paddingVertical: size === 'sm' ? spacing.xs : size === 'lg' ? spacing.md : spacing.sm,
    },
    embeddedContainer: {
      paddingHorizontal: spacing.sm,
      paddingVertical: size === 'sm' ? spacing.xs : size === 'lg' ? spacing.md : spacing.sm
    },
    placeholder: { color: colors.textPrimary, fontSize: typography.md.fontSize },
  });
  if (type === 'above') {
    return (
      <View ref={ref} style={[styles.container, style]}>
        <Picker
          style={{ color: 'white' }}
          dropdownIconColor={'white'}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          mode="dialog"
          itemStyle={{ height: spacing.md, color: colors.primary }}
        >
          {placeholder && (
            <Picker.Item label={placeholder} value="" color='black' />
          )}
          {options.map((opt: any) => (
            <Picker.Item label={opt.name} value={{...opt}} />
          ))}
        </Picker>
      </View>
    );
  } else if (type === 'embed') {
    return(
      <View ref={ref} style={[styles.embeddedContainer, style]}>
        <Picker
          style={{ color: 'white', backgroundColor: 'transparent' }}
          dropdownIconColor={'white'}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          mode="dialog"
          itemStyle={{ height: spacing.md, color: colors.primary }}
        >
          {placeholder && (
            <Picker.Item label={placeholder} value="" color={'black'} />
          )}
          {options.map((opt: any) => (
            <Picker.Item label={opt.name} value={{...opt}} />
          ))}
        </Picker>
      </View>
    )
  }
});

Select.displayName = 'Select';
export default Select;
