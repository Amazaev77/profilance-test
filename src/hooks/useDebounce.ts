import {useCallback, useRef} from "react";
// хук из интернета
export function useDebounce(callback: any, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])
  return debouncedCallback;
}
