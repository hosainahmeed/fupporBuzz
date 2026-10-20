import { router, type Href } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

export const SidebarColors = {
  background: '#0d3986ff',
  text: '#ffffff',
  iconBubble: 'rgba(255, 255, 255, 0.14)',
  separator: 'rgba(255, 255, 255, 0.2)',
} as const;

type SidebarItem = {
  label: string;
  symbol: SymbolViewProps['name'];
  href?: Href;
};

const PROFILE_ITEM: SidebarItem = {
  label: 'Profile',
  symbol: { ios: 'person.crop.circle', android: 'person', web: 'person' },
  href: '/profile',
};

const MENU_ITEMS: SidebarItem[] = [
  { label: 'Categories', symbol: { ios: 'square.grid.2x2', android: 'category', web: 'category' } },
  {
    label: 'Wallet',
    symbol: {
      ios: 'wallet.pass',
      android: 'account_balance_wallet',
      web: 'account_balance_wallet',
    },
  },
  { label: 'Gift Ideas', symbol: { ios: 'gift', android: 'card_giftcard', web: 'card_giftcard' } },
  {
    label: 'Subscription',
    symbol: { ios: 'arrow.triangle.2.circlepath', android: 'subscriptions', web: 'subscriptions' },
  },
  { label: 'Store Locator', symbol: { ios: 'mappin.and.ellipse', android: 'store', web: 'store' } },
  { label: 'Loyalty Program', symbol: { ios: 'star.circle', android: 'loyalty', web: 'loyalty' } },
  { label: 'Blog & Articles', symbol: { ios: 'doc.text', android: 'article', web: 'article' } },
  { label: 'Help & Support', symbol: { ios: 'questionmark.circle', android: 'help', web: 'help' } },
];

const LOGOUT_ITEM: SidebarItem = {
  label: 'Logout',
  symbol: { ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' },
};

type SidebarPanelProps = {
  width: number;
  progress: SharedValue<number>;
  onClose: () => void;
};

export function SidebarPanel({ width, progress, onClose }: SidebarPanelProps) {
  const insets = useSafeAreaInsets();

  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.get(), [0, 0.45, 1], [0, 0.1, 1]),
  }));

  function select(item: SidebarItem) {
    onClose();

    if (item.href) {
      router.navigate(item.href);
    }
  }

  return (
    <Animated.View
      style={[
        styles.panel,
        {
          width,
          paddingTop: insets.top + Spacing.two,
          paddingBottom: insets.bottom + Spacing.four,
        },
        contentStyle,
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close menu"
        onPress={onClose}
        hitSlop={Spacing.two}
        style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
        <SymbolView
          name={{ ios: 'xmark', android: 'close', web: 'close' }}
          size={22}
          tintColor={SidebarColors.text}
        />
      </Pressable>

      <ScrollView style={styles.menu} showsVerticalScrollIndicator={false}>
        <SidebarRow featured item={PROFILE_ITEM} onPress={() => select(PROFILE_ITEM)} />

        <View style={styles.separator} />

        {MENU_ITEMS.map((item) => (
          <SidebarRow key={item.label} item={item} onPress={() => select(item)} />
        ))}
      </ScrollView>

      <View style={styles.separator} />

      <SidebarRow item={LOGOUT_ITEM} onPress={() => select(LOGOUT_ITEM)} />
    </Animated.View>
  );
}

type SidebarRowProps = {
  item: SidebarItem;
  onPress: () => void;
  featured?: boolean;
};

function SidebarRow({ item, onPress, featured }: SidebarRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={[styles.iconBubble, featured && styles.iconBubbleFeatured]}>
        <SymbolView name={item.symbol} size={featured ? 26 : 22} tintColor={SidebarColors.text} />
      </View>
      <Text style={[styles.label, featured && styles.labelFeatured]} numberOfLines={1}>
        {item.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: Spacing.four,
  },
  menu: {
    flex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
    marginLeft: -Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubbleFeatured: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: SidebarColors.iconBubble,
  },
  label: {
    color: SidebarColors.text,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    flexShrink: 1,
  },
  labelFeatured: {
    fontSize: 18,
    fontWeight: '700',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: SidebarColors.separator,
    marginVertical: Spacing.three,
  },
  pressed: {
    opacity: 0.6,
  },
});
