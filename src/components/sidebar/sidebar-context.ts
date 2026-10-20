import { createContext, useContext } from 'react';

export type SidebarContextValue = {
  /** `true` while the sidebar is open (or animating open). */
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used inside <SidebarShell>');
  }

  return context;
}
