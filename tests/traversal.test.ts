import { describe, expect, it } from 'vitest';
import type { ShelfCell } from '../src/interfaces/shelf.js';
import { neighbors, spiralTraversal } from '../src/matrix/traversal.js';

// Builds a grid where each cell's quantity equals its value, so results are easy to read.
const gridOf = (values: number[][]): ShelfCell[][] =>
    values.map((row, r) =>
        row.map((q, c) => ({ id: `cell-${r}-${c}`, productId: null, quantity: q }))
    );

const qty = (cells: readonly ShelfCell[]) => cells.map((c) => c.quantity);

describe('spiralTraversal', () => {
    it('walks a 3x3 grid in spiral order', () => {
        const grid = gridOf([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        expect(qty(spiralTraversal(grid))).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
    });

    it('handles a single row (1 x 3)', () => {
        expect(qty(spiralTraversal(gridOf([[1, 2, 3]])))).toEqual([1, 2, 3]);
    });

    it('handles a single column (3 x 1)', () => {
        expect(qty(spiralTraversal(gridOf([[1], [2], [3]])))).toEqual([1, 2, 3]);
    });

    it('handles a 2x4 rectangle', () => {
        const grid = gridOf([[1, 2, 3, 4], [5, 6, 7, 8]]);
        expect(qty(spiralTraversal(grid))).toEqual([1, 2, 3, 4, 8, 7, 6, 5]);
    });

    it('returns an empty array for an empty grid', () => {
        expect(spiralTraversal([])).toEqual([]);
    });

    it('visits every cell exactly once', () => {
        const grid = gridOf([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);
        const result = qty(spiralTraversal(grid));
        expect(result).toHaveLength(12);
        expect(new Set(result).size).toBe(12);
    });
});

describe('neighbors', () => {
    const grid = gridOf([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    it('returns up, down, left, right for a center cell in that order', () => {
        // center is 5: up=2, down=8, left=4, right=6
        expect(qty(neighbors(grid, 1, 1))).toEqual([2, 8, 4, 6]);
    });

    it('returns only 2 neighbors for a corner cell', () => {
        // top-left is 1: up and left don't exist; down=4, right=2
        expect(qty(neighbors(grid, 0, 0))).toEqual([4, 2]);
    });

    it('returns only the existing neighbors on an edge', () => {
        // top-middle is 2: down=5, left=1, right=3
        expect(qty(neighbors(grid, 0, 1))).toEqual([5, 1, 3]);
    });

    it('returns an empty array for out-of-bounds coordinates', () => {
        expect(neighbors(grid, -1, 0)).toEqual([]);
        expect(neighbors(grid, 3, 3)).toEqual([]);
    });
});