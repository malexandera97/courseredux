import { createReducer, on } from '@ngrx/store';
import { addReadNowItem, removeReadNowItem, clearReadNowItems, ReadNowItem } from '../actions/read-now.actions';

export interface ReadNowState {
  items: ReadNowItem[];
}

export const initialState: ReadNowState = {
  items: []
};

export const readNowReducer = createReducer(
  initialState,
  
  // Agregar item
  on(addReadNowItem, (state, { item }) => {
    // Evitar duplicados
    const exists = state.items.some(i => i.id === item.id);
    if (exists) {
      return state;
    }
    
    return {
      ...state,
      items: [...state.items, item]
    };
  }),
  
  // Remover item
  on(removeReadNowItem, (state, { itemId }) => ({
    ...state,
    items: state.items.filter(item => item.id !== itemId)
  })),
  
  // Limpiar todos
  on(clearReadNowItems, (state) => ({
    ...state,
    items: []
  }))
);
