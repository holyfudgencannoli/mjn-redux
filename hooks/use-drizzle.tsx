import React, { createContext, useContext, useMemo } from 'react';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';

/**
 * Lightweight typed wrapper around the expo-drizzle hook.
 * Provides a memoized context value and a safe consumer hook.
 */

export type DrizzleStudio = ReturnType<typeof useDrizzleStudio>;

export type DrizzleContextValue = {
  drizzle: DrizzleStudio | null;
};

export const DrizzleContext = createContext<DrizzleContextValue | undefined>(
  undefined);

export interface DrizzleProviderProps {
  children: React.ReactNode;
  db?: SQLiteDatabase | null;
}

export function DrizzleProvider({ children,}: DrizzleProviderProps) {
  // `useDrizzleStudio` is a hook provided by the plugin and must be called at top-level
    const db = useSQLiteContext();

    const drizzle = useDrizzleStudio(db as SQLiteDatabase) as DrizzleStudio | null;

    const value = useMemo(() => ({ drizzle }), [drizzle]);

    return (
        <DrizzleContext.Provider value={value}>
            {children}
        </DrizzleContext.Provider>
    );
}

/**
 * Hook to retrieve drizzle context value. Throws if used outside provider.
 */
export function useDrizzle() {
  const ctx = useContext(DrizzleContext);
  if (!ctx) throw new Error('useDrizzle must be used within a DrizzleProvider');
  return ctx.drizzle;
}

export default DrizzleProvider;