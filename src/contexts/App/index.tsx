import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getCategories } from '~/service/apiService';
import { Category, IAppContext, IAppProviderProps } from './types';

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProviderProps> = (
  props: IAppProviderProps,
) => {
  const { children } = props;

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(false);

  const loadCategories = useCallback(async () => {
    try {
      setLoad(true);
      const response = await getCategories();
      setCategories(response);
      setLoad(false);
    } catch (error) {
      console.log('error', error);
      setLoad(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <AppContext.Provider
      value={{
        state: {
          categories,
          selectedCategoryId,
          load,
        },
        handle: {
          setSelectedCategoryId,
          setLoad,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): IAppContext {
  const context = useContext(AppContext);

  return context;
}
