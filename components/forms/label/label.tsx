import { useShades } from '@/constants/theme/shades';
import { useSpacing } from '@/constants/theme/spacing';
import { useTypography } from '@/constants/theme/typography';
import { useColors } from '@/hooks/use-colors';
import { StyleSheet, Text, View } from 'react-native';

export const Label: React.FC<any> = ({
  id,
  name,
  label,
  size = 'md',
  variant = 'default',
  disabled = false,
  required = false,
  error,
  children,
  labelStyle
}) => {
  const typography = useTypography();
  const spacing = useSpacing();
  const shades = useShades();
  const colors = useColors();

  const styles = StyleSheet.create({
    container: { marginBottom: spacing.sm },
    label: {
      color: colors.textPrimary,
      fontSize: 
        size === 'sm' ? typography.sm.fontSize :
        size === 'lg' ? typography.lg.fontSize : 
        typography.md.fontSize,
      marginBottom: spacing.xs,
      textAlign: 'center'
    },
    errorText: {
      color: colors.error,
      fontSize: 12,
      marginTop: spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, {...labelStyle}]} accessibilityLabel={`${name}-label`}>
          {label}
          {required && <Text style={{ color: colors.error }}> *</Text>}
        </Text>
      )}
      <View style={{ flexDirection: 'row' }}>{children}</View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Label;

