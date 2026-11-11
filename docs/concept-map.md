# Concept Map

All exported operations across `src/operations/` and `src/matrix/`, with their Big-O complexity.

| Concept | Module | Function | Big-O |
|---|---|---|---|
| **1D Mutating Operations** | | | |
| Append product | `src/operations/mutating.ts` | `addProduct` | O(1) amortized |
| Prepend urgent product | `src/operations/mutating.ts` | `receiveUrgent` | O(n) |
| Remove product by ID | `src/operations/mutating.ts` | `removeProduct` | O(n) |
| Dequeue first order | `src/operations/mutating.ts` | `dispatchNextOrder` | O(n) |
| Remove last receipt | `src/operations/mutating.ts` | `undoLastReceipt` | O(1) |
| Sort by price in-place | `src/operations/mutating.ts` | `sortProductsByPriceInPlace` | O(n log n) |
| **Search & Validation** | | | |
| Find product by ID | `src/operations/search.ts` | `findProductById` | O(n) |
| Find product by SKU | `src/operations/search.ts` | `findProductBySku` | O(n) |
| Low-stock index | `src/operations/search.ts` | `findLowStockIndex` | O(n) |
| Last product in category | `src/operations/search.ts` | `findLastInCategory` | O(n) |
| Check tag membership | `src/operations/search.ts` | `hasTag` | O(n) |
| Any low stock | `src/operations/search.ts` | `hasLowStock` | O(n) |
| Order fulfillability | `src/operations/search.ts` | `isOrderFulfillable` | O(n + m) |
| **Functional Methods** | | | |
| Total inventory value | `src/operations/functional.ts` | `calculateInventoryValue` | O(n) |
| Filter low-stock products | `src/operations/functional.ts` | `getLowStockProducts` | O(n) |
| Top 5 products by value | `src/operations/functional.ts` | `getTopProductsByValue` | O(n log n) |
| All unique tags | `src/operations/functional.ts` | `getAllTags` | O(n · m) |
| Product names array | `src/operations/functional.ts` | `getProductNames` | O(n) |
| Group by category (native) | `src/operations/functional.ts` | `groupByCategoryNative` | O(n) |
| Group by category (reduce) | `src/operations/functional.ts` | `groupByCategoryReduce` | O(n) |
| Names in reverse string | `src/operations/functional.ts` | `getProductNamesInReverseString` | O(n) |
| **Immutable ES2023+ Operations** | | | |
| Add product (spread) | `src/operations/immutable.ts` | `addProductImmutable` | O(n) |
| Prepend urgent (spread) | `src/operations/immutable.ts` | `receiveUrgentImmutable` | O(n) |
| Remove by ID (toSpliced) | `src/operations/immutable.ts` | `removeProductImmutable` | O(n) |
| Dequeue first (slice) | `src/operations/immutable.ts` | `dispatchNextOrderImmutable` | O(n) |
| Remove last (slice) | `src/operations/immutable.ts` | `undoLastReceiptImmutable` | O(n) |
| Update quantity (with) | `src/operations/immutable.ts` | `updateQuantityImmutable` | O(n) |
| Sort immutably (toSorted) | `src/operations/immutable.ts` | `sortProductsByPriceImmutable` | O(n log n) |
| **2D Matrix — Grid** | | | |
| Create empty grid | `src/matrix/grid.ts` | `createGrid` | O(rows × cols) |
| Place product in cell | `src/matrix/grid.ts` | `placeProduct` | O(rows + cols) |
| Find product coordinates | `src/matrix/grid.ts` | `findProduct` | O(rows × cols) |
| **2D Matrix — Transforms** | | | |
| Row quantity totals | `src/matrix/transforms.ts` | `rowTotals` | O(rows × cols) |
| Column quantity totals | `src/matrix/transforms.ts` | `colTotals` | O(rows × cols) |
| Transpose grid | `src/matrix/transforms.ts` | `transpose` | O(rows × cols) |
| Rotate 90° clockwise | `src/matrix/transforms.ts` | `rotate90` | O(rows × cols) |
| Flatten to 1D | `src/matrix/transforms.ts` | `flattenGrid` | O(rows × cols) |
| **2D Matrix — Traversal** | | | |
| Spiral traversal | `src/matrix/traversal.ts` | `spiralTraversal` | O(rows × cols) |
| Neighboring cells | `src/matrix/traversal.ts` | `neighbors` | O(rows) |
| **CLI — Validation** | | | |
| Parse whole-number input | `src/cli/validation.ts` | `parseWholeNumber` | O(k), k = input length |
| **CLI — Commands** | | | |
| Find SKU on shelf | `src/cli/commands.ts` | `findOnShelf` | O(rows × cols) |
| Format inventory report | `src/cli/commands.ts` | `formatReport` | O(rows × cols) |
| Format shelf grid map | `src/cli/commands.ts` | `formatGridMap` | O(rows × cols) |

