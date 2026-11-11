import { describe, expect, it } from 'vitest';
import {
    createGrid,
    placeProduct,
    findProduct,
    OutOfBoundsError,
    NegativeQuantityError,
} from '../src/matrix/grid.js';

describe('Shelf Grid (2D Matrix)', () => {
    it('createGrid returns rows x cols with unique cell ids', () => {
        const grid = createGrid(2, 3);
        expect(grid).toHaveLength(2);
        expect(grid[0]).toHaveLength(3);
        expect(grid[0]![0]!.id).toBe('cell-0-0');
        expect(grid[1]![2]!.id).toBe('cell-1-2');
    });

    it('createGrid cells are independent objects', () => {
        const grid = createGrid(2, 2);
        expect(grid[0]![0]).not.toBe(grid[0]![1]);
        expect(grid[0]![0]).not.toBe(grid[1]![0]);
    });

    it('createGrid rows are independent arrays', () => {
        const grid = createGrid(2, 2);
        expect(grid[0]).not.toBe(grid[1]);
    });

    it('placeProduct does not mutate the original grid', () => {
        const grid = createGrid(2, 2);
        const snapshot = structuredClone(grid);

        const updated = placeProduct(grid, 0, 1, 'prod-A', 5);

        expect(grid).toEqual(snapshot);
        expect(updated).not.toBe(grid);
        expect(updated[1]).toBe(grid[1]); // untouched row keeps reference
    });

    it('placeProduct keeps the cell id and updates product fields', () => {
        const grid = createGrid(2, 2);
        const updated = placeProduct(grid, 0, 1, 'prod-A', 5);
        expect(updated[0]![1]).toEqual({ id: 'cell-0-1', productId: 'prod-A', quantity: 5 });
    });

    it('placeProduct throws OutOfBoundsError outside the grid', () => {
        const grid = createGrid(2, 2);
        expect(() => placeProduct(grid, 5, 0, 'prod-A', 1)).toThrow(OutOfBoundsError);
        expect(() => placeProduct(grid, 0, -1, 'prod-A', 1)).toThrow(OutOfBoundsError);
    });

    it('placeProduct throws NegativeQuantityError for negative quantity', () => {
        const grid = createGrid(2, 2);
        expect(() => placeProduct(grid, 0, 0, 'prod-A', -1)).toThrow(NegativeQuantityError);
    });

    it('findProduct returns [row, col] or undefined', () => {
        const grid = placeProduct(createGrid(2, 3), 1, 2, 'prod-B', 3);
        expect(findProduct(grid, 'prod-B')).toEqual([1, 2]);
        expect(findProduct(grid, 'missing')).toBeUndefined();
    });

    it('findProduct on an empty grid returns undefined', () => {
        expect(findProduct(createGrid(0, 0), 'anything')).toBeUndefined();
    });
});