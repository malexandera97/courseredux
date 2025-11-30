import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReadNowState } from '../reducers/read-now.reducer';

// Selector del estado de "Leer ahora"
export const selectReadNowState = createFeatureSelector<ReadNowState>('readNow');

// Selector de todos los items
export const selectAllReadNowItems = createSelector(
  selectReadNowState,
  (state: ReadNowState) => state.items
);

// Selector del conteo de items
export const selectReadNowItemsCount = createSelector(
  selectAllReadNowItems,
  (items) => items.length
);

// Selector para verificar si un item específico existe
export const selectReadNowItemById = (itemId: number) => createSelector(
  selectAllReadNowItems,
  (items) => items.find(item => item.id === itemId)
);
