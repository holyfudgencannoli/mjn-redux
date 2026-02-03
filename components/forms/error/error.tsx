import { useSpacing } from '@/constants/theme/spacing';
import { useTypography } from '@/constants/theme/typography';
import { useColors } from '@/hooks/use-colors';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const FormError: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const colors = useColors();
  const typography = useTypography();
  const spacing = useSpacing();
  
  return (
    <Text style={StyleSheet.create({ error: { color: colors.error, fontSize: typography.xs.fontSize, marginTop: spacing.xs } }).error}>
      {children}
    </Text>
  );
};

export default FormError;
