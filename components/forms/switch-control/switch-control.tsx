import { useSpacing } from '@/constants/theme/spacing';
import { useColors } from '@/hooks/use-colors';
import React, { forwardRef } from 'react';
import { StyleSheet, Switch, SwitchProps, Text, View } from 'react-native';

export interface SwitchControlProps extends Omit<SwitchProps, 'size'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SwitchControl = forwardRef<Switch, SwitchControlProps>((props, ref) => {
  const { label, style, ...rest } = props;

  const spacing = useSpacing();
  const colors = useColors();

  const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center' },
    label: { marginLeft: spacing.sm, color: colors.textPrimary },
  });

  return (
    <View ref={ref} style={[styles.container, style]}>
      <Switch {...rest} />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
});

SwitchControl.displayName = 'SwitchControl';
export default SwitchControl;
