import type { ShelfCell } from "../interfaces/shelf.js";
import { assertRectangular, cellAt } from "./utils.js";

/**
 * Traverses the 2D grid in a spiral order (clockwise) starting from top-left.
 *
 * @param grid - Current 2D grid of shelf cells.
 * @returns A readonly array of shelf cells in spiral traversal order.
 *
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols) for the resulting output array.
 */
export function spiralTraversal(
    grid: readonly (readonly ShelfCell[])[]
): readonly ShelfCell[] {
    const cols = assertRectangular(grid);
    const rows = grid.length;
    if (rows === 0 || cols === 0) {
        return [];
    }

    const result: ShelfCell[] = [];
    let top = 0;
    let bottom = rows - 1;
    let left = 0;
    let right = cols - 1;

    while (top <= bottom && left <= right) {
        const topRow = grid[top];
        if (topRow !== undefined) {
            for (let c = left; c <= right; c++) {
                result.push(cellAt(grid, top, c));
            }
        }
        top++;

        for (let r = top; r <= bottom; r++) {
            result.push(cellAt(grid, r, right));
        }
        right--;

        if (top <= bottom) {
            const bottomRow = grid[bottom];
            if (bottomRow !== undefined) {
                for (let c = right; c >= left; c--) {
                    result.push(cellAt(grid, bottom, c));
                }
            }
            bottom--;
        }

        if (left <= right) {
            for (let r = bottom; r >= top; r--) {
                result.push(cellAt(grid, r, left));
            }
            left++;
        }
    }

    return result;
}

/**
 * Finds valid neighboring cells (up, down, left, right) for a given [row, col] position
 * with strict boundary checks before accessing the grid.
 *
 * @param grid - Current 2D grid of shelf cells.
 * @param row - Row coordinate of the target cell.
 * @param col - Column coordinate of the target cell.
 * @returns A readonly array of existing neighbor shelf cells.
 *
 * Time Complexity: O(rows) due to structural rectangular validation.
 * Space Complexity: O(1)
 */
export function neighbors(
    grid: readonly (readonly ShelfCell[])[],
    row: number,
    col: number
): readonly ShelfCell[] {
    const cols = assertRectangular(grid);
    const rows = grid.length;

    if (row < 0 || row >= rows || col < 0 || col >= cols) {
        return [];
    }

    const directions = [
        { r: row - 1, c: col }, // Up
        { r: row + 1, c: col }, // Down
        { r: row, c: col - 1 }, // Left
        { r: row, c: col + 1 }, // Right
    ];

    const validNeighbors: ShelfCell[] = [];

    for (const dir of directions) {
        if (dir.r >= 0 && dir.r < rows && dir.c >= 0 && dir.c < cols) {
            // Using cellAt guarantees that if a cell within bounds is missing, it throws correctly instead of hiding it.
            validNeighbors.push(cellAt(grid, dir.r, dir.c));
        }
    }

    return validNeighbors;
}