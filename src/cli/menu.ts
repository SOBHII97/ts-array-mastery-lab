// src/cli/menu.ts
import { createInterface } from "node:readline/promises";
import { createGrid, placeProduct } from "../matrix/grid.js";
import { parseWholeNumber } from "./validation.js";
import { findOnShelf, formatReport, formatGridMap } from "./commands.js";

/**
 * Starts the interactive Smart Warehouse CLI.
 * Uses a readline/promises interface with an async while(true) loop.
 * The readline interface is always closed in a finally block.
 *
 * Time Complexity: O(1) per menu iteration; individual operations are O(rows * cols).
 */
export async function startCli(): Promise<void> {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let grid = createGrid(3, 3);
    const rows = grid.length;
    const cols = grid[0]?.length ?? 0;

    const menu = [
        "1. Place product on shelf",
        "2. Find product by SKU",
        "3. Inventory report",
        "4. View shelf grid map",
        "5. Exit",
    ].join("\n");

    console.log("\n=== Smart Warehouse CLI ===\n");

    try {
        while (true) {
            console.log(`\n${menu}`);
            const choice = (await rl.question("\nChoose an option: ")).trim();

            if (choice === "1") {
                try {
                    const rawRow = await rl.question(`Row (0-${rows - 1}): `);
                    const row = parseWholeNumber(rawRow, "Row");

                    const rawCol = await rl.question(`Col (0-${cols - 1}): `);
                    const col = parseWholeNumber(rawCol, "Col");

                    const sku = (await rl.question("SKU: ")).trim();
                    if (sku === "") {
                        throw new Error("SKU must not be empty.");
                    }

                    const rawQty = await rl.question("Quantity: ");
                    const qty = parseWholeNumber(rawQty, "Quantity");

                    grid = placeProduct(grid, row, col, sku, qty);
                    console.log(`\nPlaced "${sku}" (qty ${qty}) at [${row}, ${col}].`);
                } catch (err) {
                    const error = err instanceof Error ? err : new Error(String(err));
                    console.error(`\n[OPERATION FAILED] ${error.name}: ${error.message}`);
                }
            } else if (choice === "2") {
                try {
                    const sku = (await rl.question("SKU to find: ")).trim();
                    console.log(`\n${findOnShelf(grid, sku)}`);
                } catch (err) {
                    const error = err instanceof Error ? err : new Error(String(err));
                    console.error(`\n[OPERATION FAILED] ${error.name}: ${error.message}`);
                }
            } else if (choice === "3") {
                try {
                    console.log(`\n${formatReport(grid)}`);
                } catch (err) {
                    const error = err instanceof Error ? err : new Error(String(err));
                    console.error(`\n[OPERATION FAILED] ${error.name}: ${error.message}`);
                }
            } else if (choice === "4") {
                try {
                    console.log(`\n${formatGridMap(grid)}`);
                } catch (err) {
                    const error = err instanceof Error ? err : new Error(String(err));
                    console.error(`\n[OPERATION FAILED] ${error.name}: ${error.message}`);
                }
            } else if (choice === "5") {
                console.log("\nGoodbye! Warehouse CLI closed.\n");
                break;
            } else {
                console.log('\nUnknown option. Please enter 1-5.');
            }
        }
    } finally {
        rl.close();
    }
}

