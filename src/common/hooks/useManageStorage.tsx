type GetStorageDataReturnType<T> = T extends undefined ? string : T;

export function useManageStorage<T = undefined>() {
  const getLocalStorageData = (key: string, checkEnum?: object): GetStorageDataReturnType<T> | undefined => {
    if (typeof window !== 'undefined') {
      const storagedValue = localStorage.getItem(key);
      if (storagedValue === null) return undefined;

      try {
        const parsedValue = JSON.parse(storagedValue);

        if (checkEnum) {
          const isValid = Object.values(checkEnum).includes(parsedValue);
          return isValid ? (parsedValue as GetStorageDataReturnType<T>) : undefined;
        }
        return parsedValue as GetStorageDataReturnType<T>;
      } catch {
        if (checkEnum) {
          const isValid = Object.values(checkEnum).includes(storagedValue);
          return isValid ? (storagedValue as unknown as GetStorageDataReturnType<T>) : undefined;
        }
        return storagedValue as unknown as GetStorageDataReturnType<T>;
      }
    }
    return undefined;
  };

  const setLocalStorageData = (values: { [key: string]: T }) => {
    if (typeof window !== 'undefined') {
      Object.keys(values).forEach((key) => {
        const value = values[key];
        if (typeof value === 'object') {
          localStorage.setItem(key, JSON.stringify(value));
        } else {
          localStorage.setItem(key, String(value));
        }
      });
    }
  };

  const removeLocalStorageData = (key: string | string[]) => {
    if (typeof window !== 'undefined') {
      if (typeof key === 'string') {
        localStorage.removeItem(key);
        return;
      }
      key.forEach((val) => {
        localStorage.removeItem(val);
      });
    }
  };

  return { getLocalStorageData, setLocalStorageData, removeLocalStorageData };
}
