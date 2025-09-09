import { useEffect, useState } from "react";

function useLocaleStorage(key, initialState) {
  const [value, setValue] = useState(function () {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocaleStorage;
