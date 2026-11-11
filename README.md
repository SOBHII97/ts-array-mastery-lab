# ts-array-mastery-lab

[![CI](https://github.com/SOBHII97/ts-array-mastery-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/SOBHII97/ts-array-mastery-lab/actions/workflows/ci.yml)

> Smart Warehouse CLI: a typed TypeScript sandbox covering every array and 2D matrix concept.

## Status

- [x] Phase 0: Setup
- [x] Phase 1: Types & Data
- [x] Phase 2: 1D Mutating Operations
- [x] Phase 3: Search & Validation
- [x] Phase 4: Functional Methods
- [x] Phase 5: Immutable ES2023+ Methods
- [x] Phase 6: 2D Matrix (Shelf Grid)
- [x] Phase 7: CLI & Polish

---

## Getting Started

### Requirements
- Node.js 22+

### Install & Run

```bash
npm install          # install dependencies
npm run dev          # start the interactive CLI
npm run typecheck    # strict TypeScript check (no emit)
npm test             # run all Vitest tests
```

---

## Concept Coverage

| Concept | File | Function(s) |
|---|---|---|
| **Phase 1 – Types & Data** | | |
| Product interface & seed data | `src/interfaces/product.ts` | — |
| Seed generator | `src/data/seed.ts` | `generateSeedProducts` |
| **Phase 2 – 1D Mutating** | | |
| Append (push) | `src/operations/mutating.ts` | `addProduct` |
| Prepend (unshift) | `src/operations/mutating.ts` | `receiveUrgent` |
| Remove by ID (splice) | `src/operations/mutating.ts` | `removeProduct` |
| Dequeue first (shift) | `src/operations/mutating.ts` | `dispatchNextOrder` |
| Remove last (pop) | `src/operations/mutating.ts` | `undoLastReceipt` |
| In-place sort | `src/operations/mutating.ts` | `sortProductsByPriceInPlace` |
| **Phase 3 – Search & Validation** | | |
| Find by ID | `src/operations/search.ts` | `findProductById` |
| Find by SKU | `src/operations/search.ts` | `findProductBySku` |
| Low-stock index | `src/operations/search.ts` | `findLowStockIndex` |
| Last in category | `src/operations/search.ts` | `findLastInCategory` |
| Tag check | `src/operations/search.ts` | `hasTag` |
| Any low stock | `src/operations/search.ts` | `hasLowStock` |
| Order fulfillability | `src/operations/search.ts` | `isOrderFulfillable` |
| **Phase 4 – Functional** | | |
| Inventory value | `src/operations/functional.ts` | `calculateInventoryValue` |
| Low-stock filter | `src/operations/functional.ts` | `getLowStockProducts` |
| Top by value | `src/operations/functional.ts` | `getTopProductsByValue` |
| All unique tags | `src/operations/functional.ts` | `getAllTags` |
| Product names | `src/operations/functional.ts` | `getProductNames` |
| Group by category (native) | `src/operations/functional.ts` | `groupByCategoryNative` |
| Group by category (reduce) | `src/operations/functional.ts` | `groupByCategoryReduce` |
| Names in reverse string | `src/operations/functional.ts` | `getProductNamesInReverseString` |
| **Phase 5 – Immutable ES2023+** | | |
| Add (spread) | `src/operations/immutable.ts` | `addProductImmutable` |
| Prepend (spread) | `src/operations/immutable.ts` | `receiveUrgentImmutable` |
| Remove (toSpliced) | `src/operations/immutable.ts` | `removeProductImmutable` |
| Dequeue first (slice) | `src/operations/immutable.ts` | `dispatchNextOrderImmutable` |
| Remove last (slice) | `src/operations/immutable.ts` | `undoLastReceiptImmutable` |
| Update quantity (with) | `src/operations/immutable.ts` | `updateQuantityImmutable` |
| Immutable sort (toSorted) | `src/operations/immutable.ts` | `sortProductsByPriceImmutable` |
| **Phase 6 – 2D Matrix** | | |
| Create grid | `src/matrix/grid.ts` | `createGrid` |
| Place product | `src/matrix/grid.ts` | `placeProduct` |
| Find product coords | `src/matrix/grid.ts` | `findProduct` |
| Row totals | `src/matrix/transforms.ts` | `rowTotals` |
| Column totals | `src/matrix/transforms.ts` | `colTotals` |
| Transpose | `src/matrix/transforms.ts` | `transpose` |
| Rotate 90° | `src/matrix/transforms.ts` | `rotate90` |
| Flatten grid | `src/matrix/transforms.ts` | `flattenGrid` |
| Spiral traversal | `src/matrix/traversal.ts` | `spiralTraversal` |
| Neighbors | `src/matrix/traversal.ts` | `neighbors` |
| **Phase 7 – CLI & Polish** | | |
| Input validation | `src/cli/validation.ts` | `parseWholeNumber` |
| Shelf lookup | `src/cli/commands.ts` | `findOnShelf` |
| Inventory report | `src/cli/commands.ts` | `formatReport` |
| Grid map display | `src/cli/commands.ts` | `formatGridMap` |
| Interactive CLI loop | `src/cli/menu.ts` | `startCli` |

---

> **Note:** Prices are stored as floats for simplicity.
> In production systems, monetary values should be stored as integer cents to avoid IEEE 754 rounding errors.
