import { useEffect, useState, Dispatch, useCallback } from "react";

export default function useStickyState(defaultValue: any, key: string): [any, Dispatch<any>] {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const handleStorage = useCallback((event: StorageEvent) => {
    if (event.key === key && event.newValue !== JSON.stringify(value)) {
      setValue(JSON.parse(event.newValue || "null") || defaultValue);
    }
  }, [defaultValue, key, value]);

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleStorage]);

  return [value, setValue];
}