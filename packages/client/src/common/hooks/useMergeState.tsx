import { useState } from "react";

export default function useMergeState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  const setMergeState = (newState: Partial<T>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return [state, setMergeState] as const;
}
