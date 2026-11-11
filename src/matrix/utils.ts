// src/matrix/utils.ts
import type { ShelfCell } from "../interfaces/shelf.js";
import { InvalidGridStructureError } from "../errors/grid-errors.js";

export function assertRectangular(grid: readonly (readonly ShelfCell[])[]): number {
    const cols = grid[0]?.length ?? 0;
    for (let r = 0; r < grid.length; r++) {
        const row = grid[r];
        if (row === undefined || row.length !== cols) {
            throw new InvalidGridStructureError(
                `Row ${r} has ${row?.length ?? 0} cells, expected ${cols}`
            );
        }
    }
    return cols;
}

export function cellAt(
    grid: readonly (readonly ShelfCell[])[],
    r: number,
    c: number
): ShelfCell {
    const cell = grid[r]?.[c];
    if (cell === undefined) {
        throw new InvalidGridStructureError(`Missing cell at coordinates [${r}][${c}]`);
    }
    return cell;
}