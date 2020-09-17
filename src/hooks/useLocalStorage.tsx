import { useState, useEffect, useCallback } from "react";

export default function useLocalStorage(bucketId: string): [any | null, (val: any) => void] {
  const [bucket, setBucket] = useState<any>(() => {
    if (!window.localStorage.getItem(bucketId)) {
      return null;
    } else {
      return JSON.parse(window.localStorage.getItem(bucketId)!);
    }
  });

  const changeStorageBucket = useCallback(function (newStorage) {
    if (!newStorage) {
      window.localStorage.removeItem(bucketId);
    }
    window.localStorage.setItem(bucketId, JSON.stringify(newStorage));
    return setBucket(newStorage);
  }, [bucketId]);

  const checkStorageBucket = useCallback(function () {
    if (!window.localStorage.getItem(bucket)) {
      return setBucket(null);
    } else {
      return setBucket(JSON.parse(window.localStorage.getItem(bucket)!));
    }
  }, [bucket]);

  useEffect(function () {
    window.addEventListener("storage", checkStorageBucket);

    return () => {
      window.removeEventListener("storage", checkStorageBucket);
    }
  }, [checkStorageBucket]);

  return [bucket, changeStorageBucket];
}