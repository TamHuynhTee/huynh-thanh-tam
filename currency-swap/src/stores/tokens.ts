import { create } from 'zustand';
import { Token } from '../interfaces';

const URL_TOKEN = 'https://interview.switcheo.com/prices.json';

type State = {
  initialList: Token[];
  list: Token[];
  loading: boolean;
  modalOpen: boolean;
  modalKey: string;
};

type Action = {
  setLoading: (loading: boolean) => void;
  fetchListTokenAsync: () => Promise<void>;
  searchToken: (keyword: string) => Promise<void>;
  clearSearch: () => void;
  closeModal: () => void;
  openModal: (modalKey: string) => void;
};

const initialStates: State = {
  list: [],
  initialList: [],
  loading: false,
  modalOpen: false,
  modalKey: '',
};

// Create your store, which includes both state and (optionally) actions
export const useTokenStore = create<State & Action>((set, get) => ({
  ...initialStates,
  setLoading(loading) {
    set((state) => ({ ...state, loading }));
  },
  async fetchListTokenAsync() {
    get().setLoading(true);
    setTimeout(async () => {
      try {
        const promise = await fetch(URL_TOKEN);
        if (!promise.ok) throw new Error('An error occurs in fetching tokens');
        const data = await promise.json();
        set((state) => ({ ...state, initialList: data, list: data }));
      } catch (error) {
        console.log('error fetch', error);
      } finally {
        get().setLoading(false);
      }
    }, 500);
  },
  async searchToken(keyword) {
    get().setLoading(true);

    setTimeout(() => {
      try {
        const list = get().initialList;

        const _keyword = keyword.toLowerCase();

        const _search = list.filter((item) =>
          item.currency.toLowerCase().includes(_keyword)
        );

        set((state) => ({ ...state, list: _search }));
      } catch (error) {
        console.log('error search', error);
      } finally {
        get().setLoading(false);
      }
    }, 500);
  },
  clearSearch() {
    const list = get().initialList;
    set((state) => ({ ...state, list }));
  },
  openModal(modalKey) {
    set((state) => ({ ...state, modalOpen: true, modalKey }));
  },
  closeModal() {
    set((state) => ({
      ...state,
      modalOpen: false,
      list: [],
      initialList: [],
      modalKey: '',
    }));
  },
}));
