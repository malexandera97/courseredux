import { readNowReducer, initialState, ReadNowState } from './read-now.reducer';
import { addReadNowItem, removeReadNowItem, clearReadNowItems, ReadNowItem } from '../actions/read-now.actions';

describe('ReadNow Reducer', () => {
  
  describe('Initial State', () => {
    it('should return the initial state', () => {
      const action = { type: 'NOOP' } as any;
      const result = readNowReducer(undefined, action);
      
      expect(result).toEqual(initialState);
      expect(result.items.length).toBe(0);
    });
  });

  describe('addReadNowItem', () => {
    it('should add an item to the state', () => {
      const newItem: ReadNowItem = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Test',
        readAt: '2025-11-30T00:00:00.000Z'
      };

      const action = addReadNowItem({ item: newItem });
      const result = readNowReducer(initialState, action);

      expect(result.items.length).toBe(1);
      expect(result.items[0]).toEqual(newItem);
    });

    it('should not add duplicate items', () => {
      const item: ReadNowItem = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Test',
        readAt: '2025-11-30T00:00:00.000Z'
      };

      const stateWithItem: ReadNowState = {
        items: [item]
      };

      const action = addReadNowItem({ item });
      const result = readNowReducer(stateWithItem, action);

      expect(result.items.length).toBe(1);
      expect(result).toEqual(stateWithItem);
    });

    it('should add multiple different items', () => {
      const item1: ReadNowItem = {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price: 10.00,
        category: 'Category 1',
        readAt: '2025-11-30T00:00:00.000Z'
      };

      const item2: ReadNowItem = {
        id: 2,
        name: 'Product 2',
        description: 'Description 2',
        price: 20.00,
        category: 'Category 2',
        readAt: '2025-11-30T00:00:00.000Z'
      };

      let state = readNowReducer(initialState, addReadNowItem({ item: item1 }));
      state = readNowReducer(state, addReadNowItem({ item: item2 }));

      expect(state.items.length).toBe(2);
      expect(state.items[0]).toEqual(item1);
      expect(state.items[1]).toEqual(item2);
    });
  });

  describe('removeReadNowItem', () => {
    it('should remove an item by id', () => {
      const item1: ReadNowItem = {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price: 10.00,
        category: 'Category 1',
        readAt: '2025-11-30T00:00:00.000Z'
      };

      const item2: ReadNowItem = {
        id: 2,
        name: 'Product 2',
        description: 'Description 2',
        price: 20.00,
        category: 'Category 2',
        readAt: '2025-11-30T00:00:00.000Z'
      };

      const stateWithItems: ReadNowState = {
        items: [item1, item2]
      };

      const action = removeReadNowItem({ itemId: 1 });
      const result = readNowReducer(stateWithItems, action);

      expect(result.items.length).toBe(1);
      expect(result.items[0].id).toBe(2);
      expect(result.items[0]).toEqual(item2);
    });

    it('should return unchanged state if item id does not exist', () => {
      const item: ReadNowItem = {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price: 10.00,
        category: 'Category 1',
        readAt: '2025-11-30T00:00:00.000Z'
      };

      const stateWithItem: ReadNowState = {
        items: [item]
      };

      const action = removeReadNowItem({ itemId: 999 });
      const result = readNowReducer(stateWithItem, action);

      expect(result.items.length).toBe(1);
      expect(result.items[0]).toEqual(item);
    });
  });

  describe('clearReadNowItems', () => {
    it('should clear all items', () => {
      const items: ReadNowItem[] = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          price: 10.00,
          category: 'Category 1',
          readAt: '2025-11-30T00:00:00.000Z'
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description 2',
          price: 20.00,
          category: 'Category 2',
          readAt: '2025-11-30T00:00:00.000Z'
        },
        {
          id: 3,
          name: 'Product 3',
          description: 'Description 3',
          price: 30.00,
          category: 'Category 3',
          readAt: '2025-11-30T00:00:00.000Z'
        }
      ];

      const stateWithItems: ReadNowState = { items };

      const action = clearReadNowItems();
      const result = readNowReducer(stateWithItems, action);

      expect(result.items.length).toBe(0);
      expect(result.items).toEqual([]);
    });

    it('should work on already empty state', () => {
      const action = clearReadNowItems();
      const result = readNowReducer(initialState, action);

      expect(result.items.length).toBe(0);
      expect(result).toEqual(initialState);
    });
  });

  describe('State Immutability', () => {
    it('should not mutate the original state when adding item', () => {
      const originalState: ReadNowState = { items: [] };
      const item: ReadNowItem = {
        id: 1,
        name: 'Test',
        description: 'Test',
        price: 10,
        category: 'Test',
        readAt: '2025-11-30T00:00:00.000Z'
      };

      const action = addReadNowItem({ item });
      const newState = readNowReducer(originalState, action);

      expect(originalState.items.length).toBe(0);
      expect(newState.items.length).toBe(1);
      expect(newState).not.toBe(originalState);
    });

    it('should not mutate the original state when removing item', () => {
      const item: ReadNowItem = {
        id: 1,
        name: 'Test',
        description: 'Test',
        price: 10,
        category: 'Test',
        readAt: '2025-11-30T00:00:00.000Z'
      };

      const originalState: ReadNowState = { items: [item] };
      const action = removeReadNowItem({ itemId: 1 });
      const newState = readNowReducer(originalState, action);

      expect(originalState.items.length).toBe(1);
      expect(newState.items.length).toBe(0);
      expect(newState).not.toBe(originalState);
    });
  });
});
