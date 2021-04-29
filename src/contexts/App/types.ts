import { ReactNode } from 'react';

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
}

export interface IAppProviderHandle {
  setSelectedCategoryId: (id: number) => void;
  setLoad: (load: boolean) => void;
}

export interface Category {
  id: number;
  name: string;
}
