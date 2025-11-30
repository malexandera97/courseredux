import { selectReadNowState, selectAllReadNowItems, selectReadNowItemsCount, selectReadNowItemById } from './read-now.selectors';
import { ReadNowState } from '../reducers/read-now.reducer';
import { ReadNowItem } from '../actions/read-now.actions';

describe('ReadNow Selectors', () => {
  
  const mockItems: ReadNowItem[] = [
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

  const mockState: ReadNowState = {
    items: mockItems
  };

  const mockAppState = {
    readNow: mockState
  };

  describe('selectReadNowState', () => {
    it('should select the readNow state', () => {
      const result = selectReadNowState(mockAppState as any);
      expect(result).toEqual(mockState);
    });
  });

  describe('selectAllReadNowItems', () => {
    it('should select all read now items', () => {
      const result = selectAllReadNowItems(mockAppState as any);
      expect(result).toEqual(mockItems);
      expect(result.length).toBe(3);
    });

    it('should return empty array when no items', () => {
      const emptyState = {
        readNow: { items: [] }
      };
      const result = selectAllReadNowItems(emptyState as any);
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  describe('selectReadNowItemsCount', () => {
    it('should select the count of items', () => {
      const result = selectReadNowItemsCount(mockAppState as any);
      expect(result).toBe(3);
    });

    it('should return 0 when no items', () => {
      const emptyState = {
        readNow: { items: [] }
      };
      const result = selectReadNowItemsCount(emptyState as any);
      expect(result).toBe(0);
    });
  });

  describe('selectReadNowItemById', () => {
    it('should select an item by id', () => {
      const selector = selectReadNowItemById(2);
      const result = selector(mockAppState as any);
      
      expect(result).toBeDefined();
      expect(result?.id).toBe(2);
      expect(result?.name).toBe('Product 2');
    });

    it('should return undefined for non-existent id', () => {
      const selector = selectReadNowItemById(999);
      const result = selector(mockAppState as any);
      
      expect(result).toBeUndefined();
    });

    it('should return undefined when items array is empty', () => {
      const emptyState = {
        readNow: { items: [] }
      };
      const selector = selectReadNowItemById(1);
      const result = selector(emptyState as any);
      
      expect(result).toBeUndefined();
    });
  });

  describe('Selector Memoization', () => {
    it('should return the same reference for same state', () => {
      const result1 = selectAllReadNowItems(mockAppState as any);
      const result2 = selectAllReadNowItems(mockAppState as any);
      
      expect(result1).toBe(result2);
    });
  });
});
