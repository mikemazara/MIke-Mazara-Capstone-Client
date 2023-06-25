import { useState, useEffect } from "react";

export default function useSessionStorageState(whatever, startingValue) {
  const getStorage = sessionStorage.getItem(whatever);
  if (getStorage != null) {
    try {
      startingValue = JSON.parse(getStorage);
    } catch (err) {
      console.error(err);
    }
  }
  const [state, setState] = useState(startingValue);

  useEffect(() => {
    sessionStorage.setItem(whatever, JSON.stringify(state));
  }, [whatever, state]);

  return [state, setState];
}
