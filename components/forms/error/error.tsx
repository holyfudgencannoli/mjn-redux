import { useTheme } from '@theme/hooks/use-theme';
import { useSpacing } from '@theme/spacing';
import { useTypography } from '@theme/typography';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const FormError: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { colors } = useTheme();
  const typography = useTypography();
  const spacing = useSpacing();
  
  return (
    <Text style={StyleSheet.create({ error: { color: colors.error, fontSize: typography.xs.fontSize, marginTop: spacing.xs } }).error}>
      {children}
    </Text>
  );
};

export default FormError;
