import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Category from '~/models/categoryModel';
import Question, { DifficultyType } from '~/models/questionModel';
import { getCategories } from '~/service/apiService';
import { IAppContext, IAppProviderProps } from './types';

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProviderProps> = (
  props: IAppProviderProps,
) => {
  const { children } = props;

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyType>('easy');

  const loadCategories = useCallback(async () => {
    try {
      setLoad(true);
      const response = await getCategories();
      const categoriesResult = response.trivia_categories;
      setCategories(categoriesResult);
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
          question,
          difficulty,
        },
        handle: {
          setSelectedCategoryId,
          setLoad,
          setQuestion,
          setDifficulty,
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
