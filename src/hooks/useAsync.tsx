import { useState, useCallback, useEffect } from "react";

export type StatusOptions = "idle" | "pending" | "success" | "error";

type ExecFunction<T> = (...arg: T[]) => void;

type AsyncFunction = (...arg: any[]) => Promise<any>;

type ReturnUseAsync<T> = {
  execute: ExecFunction<T>;
  status: StatusOptions;
  error: Error | null;
  value: T;
};

export default function useAsync<T>(asyncFunction: AsyncFunction, immediate: boolean = true): ReturnUseAsync<T> {
  const [status, setStatus] = useState<StatusOptions>('idle');
  const [value, setValue] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute: ExecFunction<T> = useCallback(async (props) => {
    setStatus('pending');
    setValue(null);
    setError(null);

    try {
      const response = await asyncFunction(props);
      setValue(response);
      setStatus('success');
      return null;
    } catch (error) {
      setError(error);
      setStatus('error');
      return null;
    }

  }, [asyncFunction]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };

}