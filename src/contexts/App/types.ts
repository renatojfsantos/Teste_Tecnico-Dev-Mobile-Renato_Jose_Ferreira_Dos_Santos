import { ReactNode } from 'react';
import Category from '~/models/categoryModel';
import Question, { DifficultyType } from '~/models/questionModel';

export interface IAppContext {
  state: IAppProviderState;
  handle: IAppProviderHandle;
}

export interface IAppProviderProps {
  children: ReactNode;
}

export interface IAppProviderState {
  categories: Category[];
  selectedCategoryId: number;
  load: boolean;
  question: Question | null;
  difficulty: DifficultyType;
}

export interface IAppProviderHandle {
  setSelectedCategoryId: (id: number) => void;
  setLoad: (load: boolean) => void;
  setQuestion: (question: Question) => void;
  setDifficulty: (difficulty: DifficultyType) => void;
}
