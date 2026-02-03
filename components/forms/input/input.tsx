import { useTheme } from '@theme/hooks/use-theme';
import { useSpacing } from '@theme/spacing';
import { useTypography } from '@theme/typography';
import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean
}

const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const { setValue, resetField, watch } = useForm();
  const { style, size = 'md', ...rest } = props;
  const spacing = useSpacing();
  const typography = useTypography();
  const { colors } = useTheme();


  const styles = StyleSheet.create({
    base: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 4,
      paddingHorizontal: spacing.sm,
      paddingVertical: size === 'sm' ? spacing.xs : size === 'lg' ? spacing.md : spacing.sm,
      fontSize: size === 'sm' ? typography.sm.fontSize : size === 'lg' ? typography.lg.fontSize : typography.md.fontSize,
      color: colors.textPrimary,
    },
  });

  return (
    <TextInput 
      ref={ref} 
      style={[styles.base, style]} 
      {...rest} 
    />
  );
});

Input.displayName = 'Input';
export default Input;
