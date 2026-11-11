// src/cli/commands.ts
import type { ShelfCell } from "../interfaces/shelf.js";
import { findProduct } from "../matrix/grid.js";
import { rowTotals, colTotals } from "../matrix/transforms.js";

type Grid = readonly (readonly ShelfCell[])[];

/**
 * Looks up a SKU on the warehouse shelf grid and returns a human-readable location string.
 *
 * @param grid - The current 2D shelf grid.
 * @param sku  - Product SKU to search for.
 * @returns A message describing where the product is, or that it was not found.
 *
 * Time Complexity: O(rows * cols) — delegates to findProduct which scans the grid.
 */
export function findOnShelf(grid: Grid, sku: string): string {
    const coords = findProduct(grid, sku);
    if (coords === undefined) {
        return `Product "${sku}" not found on any shelf.`;
    }
    const [row, col] = coords;
    return `Product "${sku}" is at Row ${row}, Col ${col}.`;
}

/**
 * Builds a formatted inventory report showing row and column quantity totals.
 *
 * @param grid - The current 2D shelf grid.
 * @returns A multi-line string with per-row totals and per-column totals.
 *
 * Time Complexity: O(rows * cols) — rowTotals and colTotals each scan the whole grid once.
 */
export function formatReport(grid: Grid): string {
    const rTotals = rowTotals(grid);
    const cTotals = colTotals(grid);

    const rowLines = rTotals.map((total, r) => `  Row ${r}: ${total} units`);
    const colLines = cTotals.map((total, c) => `  Col ${c}: ${total} units`);

    return [
        "=== Inventory Report ===",
        "Row Totals:",
        ...rowLines,
        "Column Totals:",
        ...colLines,
        "========================",
    ].join("\n");
}

/**
 * Formats the entire shelf grid as a human-readable map.
 * Each row is printed on one line; each cell shows "PRODUCT_ID:QTY" or "EMPTY:0".
 *
 * @param grid - The current 2D shelf grid.
 * @returns A multi-line string representing the grid layout.
 *
 * Time Complexity: O(rows * cols) — visits every cell exactly once.
 */
export function formatGridMap(grid: Grid): string {
    const lines: string[] = ["=== Shelf Grid Map ==="];

    for (let r = 0; r < grid.length; r++) {
        const row = grid[r];
        if (row === undefined) continue;

        const cells = row.map((cell) => {
            const label = cell.productId !== null ? cell.productId : "EMPTY";
            return `[${label}:${cell.quantity}]`;
        });
        lines.push(`Row ${r}: ${cells.join(" ")}`);
    }

    lines.push("======================");
    return lines.join("\n");
}

