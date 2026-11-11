// tests/cli.test.ts
import { describe, it, expect } from "vitest";
import { parseWholeNumber } from "../src/cli/validation.js";
import { findOnShelf, formatGridMap, formatReport } from "../src/cli/commands.js";
import { createGrid, placeProduct } from "../src/matrix/grid.js";

// ---------------------------------------------------------------------------
// parseWholeNumber
// ---------------------------------------------------------------------------
describe("parseWholeNumber", () => {
    it("accepts '2'", () => {
        expect(parseWholeNumber("2", "Row")).toBe(2);
    });

    it("accepts ' -5 ' (with surrounding spaces)", () => {
        expect(parseWholeNumber(" -5 ", "Row")).toBe(-5);
    });

    it("accepts '0'", () => {
        expect(parseWholeNumber("0", "Quantity")).toBe(0);
    });

    it("rejects empty string ''", () => {
        expect(() => parseWholeNumber("", "Row")).toThrow(
            'Row must be a whole number, got "".'
        );
    });

    it("rejects whitespace-only string '   '", () => {
        expect(() => parseWholeNumber("   ", "Row")).toThrow(
            'Row must be a whole number, got "".'
        );
    });

    it("rejects '1.5' (decimal)", () => {
        expect(() => parseWholeNumber("1.5", "Quantity")).toThrow(
            'Quantity must be a whole number, got "1.5".'
        );
    });

    it("rejects 'abc' (non-numeric)", () => {
        expect(() => parseWholeNumber("abc", "Row")).toThrow(
            'Row must be a whole number, got "abc".'
        );
    });

    it("rejects '1e3' (scientific notation)", () => {
        expect(() => parseWholeNumber("1e3", "Row")).toThrow(
            'Row must be a whole number, got "1e3".'
        );
    });
});

// ---------------------------------------------------------------------------
// findOnShelf
// ---------------------------------------------------------------------------
describe("findOnShelf", () => {
    it("returns a 'not found' message when SKU is absent", () => {
        const grid = createGrid(2, 2);
        expect(findOnShelf(grid, "SKU-XYZ")).toBe(
            'Product "SKU-XYZ" not found on any shelf.'
        );
    });

    it("returns coordinates when SKU is present", () => {
        const grid = placeProduct(createGrid(2, 2), 1, 0, "SKU-ABC", 5);
        expect(findOnShelf(grid, "SKU-ABC")).toBe(
            'Product "SKU-ABC" is at Row 1, Col 0.'
        );
    });
});

// ---------------------------------------------------------------------------
// formatGridMap
// ---------------------------------------------------------------------------
describe("formatGridMap", () => {
    it("shows EMPTY:0 for an empty cell", () => {
        const grid = createGrid(1, 1);
        const output = formatGridMap(grid);
        expect(output).toContain("[EMPTY:0]");
    });

    it("shows the SKU and quantity for a placed product", () => {
        const grid = placeProduct(createGrid(2, 2), 0, 1, "SKU-99", 7);
        const output = formatGridMap(grid);
        expect(output).toContain("[SKU-99:7]");
    });
});

// ---------------------------------------------------------------------------
// formatReport
// ---------------------------------------------------------------------------
describe("formatReport", () => {
    it("reports correct row and column totals", () => {
        let grid = createGrid(2, 2);
        grid = placeProduct(grid, 0, 0, "A", 3);
        grid = placeProduct(grid, 0, 1, "B", 2);
        grid = placeProduct(grid, 1, 0, "C", 4);
        // row 0 total = 5, row 1 total = 4
        // col 0 total = 7, col 1 total = 2

        const report = formatReport(grid);
        expect(report).toContain("Row 0: 5 units");
        expect(report).toContain("Row 1: 4 units");
        expect(report).toContain("Col 0: 7 units");
        expect(report).toContain("Col 1: 2 units");
    });
});

