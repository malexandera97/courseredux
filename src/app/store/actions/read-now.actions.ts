import { createAction, props } from '@ngrx/store';

export interface ReadNowItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  readAt: string;
}

// Acción para agregar un item "Leer ahora"
export const addReadNowItem = createAction(
  '[Read Now] Add Item',
  props<{ item: ReadNowItem }>()
);

// Acción para remover un item "Leer ahora"
export const removeReadNowItem = createAction(
  '[Read Now] Remove Item',
  props<{ itemId: number }>()
);

// Acción para limpiar todos los items "Leer ahora"
export const clearReadNowItems = createAction(
  '[Read Now] Clear All Items'
);
