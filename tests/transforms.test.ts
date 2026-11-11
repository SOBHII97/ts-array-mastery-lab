import { describe, expect, it } from 'vitest';
import type { ShelfCell } from '../src/interfaces/shelf.js';
import {
    rowTotals,
    colTotals,
    transpose,
    rotate90,
    flattenGrid,
} from '../src/matrix/transforms.js';

const cell = (id: string, quantity: number): ShelfCell => ({
    id,
    productId: null,
    quantity,
});

// 2 x 3 grid:
// [ 1, 2, 3 ]
// [ 4, 5, 6 ]
const makeGrid = () => [
    [cell('a', 1), cell('b', 2), cell('c', 3)],
    [cell('d', 4), cell('e', 5), cell('f', 6)],
];

const quantities = (grid: readonly (readonly ShelfCell[])[]) =>
    grid.map((row) => row.map((c) => c.quantity));

describe('Grid transforms', () => {
    it('rowTotals sums each row', () => {
        expect(rowTotals(makeGrid())).toEqual([6, 15]);
    });

    it('colTotals sums each column without transposing', () => {
        expect(colTotals(makeGrid())).toEqual([5, 7, 9]);
    });

    it('transpose swaps rows and columns (2x3 becomes 3x2)', () => {
        const t = transpose(makeGrid());
        expect(t).toHaveLength(3);
        expect(t[0]).toHaveLength(2);
        expect(quantities(t)).toEqual([[1, 4], [2, 5], [3, 6]]);
    });

    it('rotate90 rotates clockwise (2x3 becomes 3x2)', () => {
        const r = rotate90(makeGrid());
        expect(r).toHaveLength(3);
        expect(r[0]).toHaveLength(2);
        expect(quantities(r)).toEqual([[4, 1], [5, 2], [6, 3]]);
    });

    it('flattenGrid returns rows x cols items in row-major order', () => {
        const flat = flattenGrid(makeGrid());
        expect(flat).toHaveLength(6);
        expect(flat.map((c) => c.quantity)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('transforms share cell references (structural sharing)', () => {
        const grid = makeGrid();
        expect(transpose(grid)[0]![0]).toBe(grid[0]![0]);
        expect(rotate90(grid)[0]![0]).toBe(grid[1]![0]);
    });

    it('transforms do not mutate the input', () => {
        const grid = makeGrid();
        const snapshot = structuredClone(grid);

        rowTotals(grid);
        colTotals(grid);
        transpose(grid);
        rotate90(grid);
        flattenGrid(grid);

        expect(grid).toEqual(snapshot);
    });

    it('handles an empty grid', () => {
        expect(rowTotals([])).toEqual([]);
        expect(colTotals([])).toEqual([]);
        expect(transpose([])).toEqual([]);
        expect(rotate90([])).toEqual([]);
        expect(flattenGrid([])).toEqual([]);
    });
});