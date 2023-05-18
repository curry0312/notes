import { useEffect, useState } from "react";
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      //if the initialValue we passed in is a function, invoke it
      if (typeof initialValue == "function") {
        return (initialValue as () => T)();
      //if the value we pass in is not a function just a normal initialValue, set it as value
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}
