import type { ShelfCell } from "../interfaces/shelf.js";
import { assertRectangular, cellAt } from "./utils.js";

/**
 * Calculates the total quantity for each row in the grid.
 *
 * @param grid - Current 2D grid of shelf cells.
 * @returns A readonly array of total quantities per row.
 *
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows)
 */
export function rowTotals(
    grid: readonly (readonly ShelfCell[])[]
): readonly number[] {
    assertRectangular(grid);
    return grid.map((row) =>
        row.reduce((sum, cell) => sum + cell.quantity, 0)
    );
}

/**
 * Calculates the total quantity for each column in the grid.
 *
 * @param grid - Current 2D grid of shelf cells.
 * @returns A readonly array of total quantities per column.
 *
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(cols)
 */
export function colTotals(
    grid: readonly (readonly ShelfCell[])[]
): readonly number[] {
    const cols = assertRectangular(grid);
    if (cols === 0) {
        return [];
    }
    const rows = grid.length;

    return Array.from({ length: cols }, (_, c) =>
        Array.from({ length: rows }, (_, r) => cellAt(grid, r, c)).reduce(
            (sum, cell) => sum + cell.quantity,
            0
        )
    );
}

/**
 * Transposes the grid, swapping rows and columns (e.g., R x C becomes C x R).
 * Note: Utilizes structural sharing where cell object references are shared with the original grid.
 *
 * @param grid - Current 2D grid of shelf cells.
 * @returns A new transposed 2D readonly grid.
 *
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
export function transpose(
    grid: readonly (readonly ShelfCell[])[]
): readonly (readonly ShelfCell[])[] {
    const cols = assertRectangular(grid);
    const rows = grid.length;
    if (cols === 0 || rows === 0) {
        return [];
    }

    return Array.from({ length: cols }, (_, c) =>
        Array.from({ length: rows }, (_, r) => cellAt(grid, r, c))
    );
}

/**
 * Rotates the grid 90 degrees clockwise.
 * Note: Utilizes structural sharing of cell object references.
 *
 * @param grid - Current 2D grid of shelf cells.
 * @returns A new 90-degree clockwise rotated 2D readonly grid.
 *
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
export function rotate90(
    grid: readonly (readonly ShelfCell[])[]
): readonly (readonly ShelfCell[])[] {
    const cols = assertRectangular(grid);
    const rows = grid.length;
    if (cols === 0 || rows === 0) {
        return [];
    }

    return Array.from({ length: cols }, (_, newR) =>
        Array.from({ length: rows }, (_, newC) => {
            const oldR = rows - 1 - newC;
            const oldC = newR;
            return cellAt(grid, oldR, oldC);
        })
    );
}

/**
 * Flattens the 2D grid into a 1D array of shelf cells.
 * Note: Utilizes structural sharing of cell references.
 *
 * @param grid - Current 2D grid of shelf cells.
 * @returns A 1D readonly array containing all cells in row-major order.
 *
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
export function flattenGrid(
    grid: readonly (readonly ShelfCell[])[]
): readonly ShelfCell[] {
    assertRectangular(grid);
    return grid.flat();
}