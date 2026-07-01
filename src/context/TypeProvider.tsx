"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { TypeId } from "@/data/types";

interface TypeContextValue {
  type: TypeId | null;
  chosen: boolean;
  setType: (type: TypeId) => void;
  reset: () => void;
}

const TypeContext = createContext<TypeContextValue | null>(null);
const STORAGE_KEY = "trainer-type";

export function TypeProvider({ children }: { children: ReactNode }) {
  const [type, setTypeState] = useState<TypeId | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as TypeId | null;
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
        setTypeState(saved);
        document.documentElement.dataset.type = saved;
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setType = useCallback((next: TypeId) => {
    setTypeState(next);
    document.documentElement.dataset.type = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const reset = useCallback(() => {
    setTypeState(null);
    delete document.documentElement.dataset.type;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <TypeContext.Provider value={{ type, chosen: type !== null, setType, reset }}>
      {children}
    </TypeContext.Provider>
  );
}

export function useTrainerType(): TypeContextValue {
  const ctx = useContext(TypeContext);
  if (!ctx) throw new Error("useTrainerType must be used within <TypeProvider>");
  return ctx;
}
