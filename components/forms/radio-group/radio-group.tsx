import { useTheme } from '@theme/hooks/use-theme';
import { useSpacing } from '@theme/spacing';
import { useTypography } from '@theme/typography';
import React, { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface RadioOption {
  label: string;
  value: string | number;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue?: string | number;
  onChange: (value: string | number) => void;
  size?: 'sm' | 'md' | 'lg';
  style?: object;
}

const RadioGroup = forwardRef<View, RadioGroupProps>((props, ref) => {
  const { options, selectedValue, onChange, size = 'md', style } = props;
  const { colors } = useTheme();
  const spacing = useSpacing();
  const typography = useTypography();

  const styles = StyleSheet.create({
    container: { flexDirection: 'row', flexWrap: 'wrap' },
    option: { flexDirection: 'row', alignItems: 'center', marginRight: spacing.sm, marginBottom: spacing.xs },
    circle: {
      width: size === 'sm' ? 12 : size === 'lg' ? 20 : 16,
      height: size === 'sm' ? 12 : size === 'lg' ? 20 : 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
      marginRight: spacing.xs,
    },
    selectedCircle: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    label: { color: colors.textPrimary, fontSize: size === 'sm' ? typography.sm.fontSize : size === 'lg' ? typography.lg.fontSize : typography.md.fontSize },
  });

  return (
    <View ref={ref} style={[styles.container, style]}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            style={styles.option}
            onPress={() => onChange(opt.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
          >
            <View style={[styles.circle, isSelected && styles.selectedCircle]} />
            <Text style={styles.label}>{opt.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
