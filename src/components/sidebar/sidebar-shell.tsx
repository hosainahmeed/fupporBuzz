import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import {
  BackHandler,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { SidebarContext, type SidebarContextValue } from './sidebar-context';
import { SidebarColors, SidebarPanel } from './sidebar-panel';

import { useTheme } from '@/hooks/use-theme';

/** How far right the app layer slides, as a fraction of the window width. */
const TRANSLATE_RATIO = 0.62;
/** Width of the green panel, as a fraction of the window width. */
const PANEL_RATIO = 0.7;
/** Scale and corner radius of the app layer when the sidebar is fully open. */
const OPEN_SCALE = 0.82;
const OPEN_RADIUS = 24;

const SPRING = { damping: 18, stiffness: 160, mass: 0.9 } as const;

/**
 * Renders the whole tab navigator as a single layer that slides, shrinks and
 * rounds its corners to reveal the green sidebar behind it.
 */
export function SidebarShell({ children }: PropsWithChildren) {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const progress = useSharedValue(0);
  const [isOpen, setIsOpen] = useState(false);
  // Mirrors `isOpen` so repeated taps cannot queue conflicting animations.
  const openRef = useRef(false);

  const setOpen = useCallback(
    (next: boolean) => {
      if (openRef.current === next) return;

      openRef.current = next;
      setIsOpen(next);
      progress.set(withSpring(next ? 1 : 0, SPRING));
    },
    [progress]
  );

  const sidebar = useMemo<SidebarContextValue>(
    () => ({
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen(!openRef.current),
    }),
    [isOpen, setOpen]
  );

  useEffect(() => {
    if (!isOpen || Platform.OS !== 'android') return;

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      setOpen(false);
      return true;
    });

    return () => subscription.remove();
  }, [isOpen, setOpen]);

  const translateX = width * TRANSLATE_RATIO;

  const appLayerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: progress.get() * translateX },
      { scale: interpolate(progress.get(), [0, 1], [1, OPEN_SCALE]) },
    ],
    borderRadius: progress.get() * OPEN_RADIUS,
  }));

  const appClipStyle = useAnimatedStyle(() => ({
    borderRadius: progress.get() * OPEN_RADIUS,
  }));

  return (
    <SidebarContext.Provider value={sidebar}>
      <View style={styles.root}>
        <StatusBar style={isOpen ? 'light' : 'auto'} animated />

        <SidebarPanel width={width * PANEL_RATIO} progress={progress} onClose={sidebar.close} />

        {/* Outer layer carries the shadow, inner layer clips to the rounded corners. */}
        <Animated.View
          collapsable={false}
          style={[styles.appLayer, { backgroundColor: theme.background }, appLayerStyle]}>
          <Animated.View
            collapsable={false}
            style={[styles.appClip, { backgroundColor: theme.background }, appClipStyle]}>
            {children}

            {isOpen ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close menu"
                onPress={sidebar.close}
                style={styles.closeOverlay}
              />
            ) : null}
          </Animated.View>
        </Animated.View>
      </View>
    </SidebarContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SidebarColors.background,
  },
  appLayer: {
    flex: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: -8, height: 0 },
    elevation: 12,
  },
  appClip: {
    flex: 1,
    overflow: 'hidden',
  },
  closeOverlay: {
    ...StyleSheet.absoluteFill,
  },
});
