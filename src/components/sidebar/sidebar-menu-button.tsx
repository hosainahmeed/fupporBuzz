import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet } from 'react-native';

import { useSidebar } from './sidebar-context';

import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Hamburger button that opens the sidebar. Must be rendered inside <SidebarShell>. */
export function SidebarMenuButton() {
  const { toggle } = useSidebar();
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open menu"
      onPress={toggle}
      hitSlop={Spacing.two}
      style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView type="backgroundElement" style={styles.button}>
        <SymbolView
          name={{ ios: 'line.3.horizontal', android: 'menu', web: 'menu' }}
          size={22}
          tintColor={theme.text}
        />
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
