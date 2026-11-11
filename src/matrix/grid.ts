import type { ShelfCell } from "../interfaces/shelf.js";

/**
 * Custom error thrown when grid coordinates are out of valid bounds.
 */
export class OutOfBoundsError extends Error {
    constructor(row: number, col: number) {
        super(`Cell [${row}, ${col}] is outside the grid`);
        this.name = "OutOfBoundsError";
    }
}

/**
 * Custom error thrown when quantity is negative.
 */
export class NegativeQuantityError extends Error {
    constructor(quantity: number) {
        super(`Quantity cannot be negative: ${quantity}`);
        this.name = "NegativeQuantityError";
    }
}

/**
 * Creates a 2D grid matrix representing warehouse shelves immutably.
 *
 * @param rows - Number of rows in the grid.
 * @param cols - Number of columns in the grid.
 * @returns A 2D readonly array of ShelfCell objects with unique cell IDs.
 *
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
export function createGrid(
    rows: number,
    cols: number
): readonly (readonly ShelfCell[])[] {
    return Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => ({
            id: `cell-${r}-${c}`,
            productId: null,
            quantity: 0,
        }))
    );
}

/**
 * Places or updates a product in a specific cell of the grid immutably, preserving the cell's ID.
 * Design Choice: Overwrites the target cell content while keeping its location-based ID intact.
 *
 * @param grid - Current 2D grid of shelf cells.
 * @param row - Row index.
 * @param col - Column index.
 * @param productId - Product identifier to place.
 * @param quantity - Quantity of the product.
 * @returns A new 2D grid with the specified cell updated using Array.prototype.with().
 * @throws OutOfBoundsError if coordinates are outside grid boundaries.
 * @throws NegativeQuantityError if quantity is less than zero.
 *
 * Time Complexity: O(rows + cols) due to shallow copying the target row and grid array.
 * Space Complexity: O(rows + cols)
 */
export function placeProduct(
    grid: readonly (readonly ShelfCell[])[],
    row: number,
    col: number,
    productId: string,
    quantity: number
): readonly (readonly ShelfCell[])[] {
    if (quantity < 0) {
        throw new NegativeQuantityError(quantity);
    }

    const targetRow = grid[row];
    if (targetRow === undefined) {
        throw new OutOfBoundsError(row, col);
    }

    const targetCell = targetRow[col];
    if (targetCell === undefined) {
        throw new OutOfBoundsError(row, col);
    }

    // Preserve the original cell's id using spread operator
    const updatedCell: ShelfCell = {
        ...targetCell,
        productId,
        quantity,
    };

    const newRow = targetRow.with(col, updatedCell);
    return grid.with(row, newRow);
}
/**
 * Finds the coordinates [row, col] of a product within the grid.
 *
 * @param grid - Current 2D grid of shelf cells.
 * @param productId - Product identifier to search for.
 * @returns A readonly tuple [row, col] if found, otherwise undefined.
 *
 * Time Complexity: O(rows * cols) worst-case.
 * Space Complexity: O(1)
 *
 * Design Choice:
 * We chose a traditional nested 'for' loop over nested 'findIndex' because it allows an immediate
 * early exit (`return`) the exact millisecond the product is found, avoiding wasted iterations
 * across the rest of the warehouse grid.
 */
export function findProduct(
    grid: readonly (readonly ShelfCell[])[],
    productId: string
): readonly [number, number] | undefined {
    for (let r = 0; r < grid.length; r++) {
        const currentRow = grid[r];
        if (currentRow === undefined) {
            continue;
        }
        for (let c = 0; c < currentRow.length; c++) {
            const cell = currentRow[c];
            if (cell !== undefined && cell.productId === productId) {
                return [r, c];
            }
        }
    }
    return undefined;
}