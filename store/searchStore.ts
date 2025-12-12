import { SearchInterface } from '@/interfaces';
import { create } from 'zustand';

export const useSearchStore = create<SearchInterface>((set) => ({
  search: '',
  setSearch: (search: string) => set({ search }),
}))

