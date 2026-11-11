import { describe, expect, it } from 'vitest';
import {
    calculateInventoryValue,
    getLowStockProducts,
    getTopProductsByValue,
    getAllTags,
    getProductNames,
    groupByCategoryNative,
    groupByCategoryReduce,
    getProductNamesInReverseString,
} from '../src/operations/functional.js';
import type { Product } from '../src/interfaces/product.js';

const make = (overrides: Partial<Product> & Pick<Product, 'id'>): Product => ({
    sku: `SKU-${overrides.id}`,
    name: `Name ${overrides.id}`,
    category: 'electronics',
    price: 10,
    quantity: 1,
    tags: [],
    reorderLevel: 0,
    ...overrides,
});

describe('Functional Array Methods & Reports', () => {
    it('calculates total inventory value accurately (e.g. 40 total)', () => {
        const products: Product[] = [
            { id: '1', sku: 'SKU-1', name: 'P1', category: 'electronics', price: 10, quantity: 2, tags: [], reorderLevel: 1 },
            { id: '2', sku: 'SKU-2', name: 'P2', category: 'grocery', price: 5, quantity: 4, tags: [], reorderLevel: 1 },
        ];
        // (10 * 2) + (5 * 4) = 20 + 20 = 40
        expect(calculateInventoryValue(products)).toBe(40);
        expect(calculateInventoryValue([])).toBe(0);
    });

    it('filters low stock products, handles empty array, and includes equality with reorderLevel', () => {
        const products: Product[] = [
            { id: '1', sku: 'SKU-1', name: 'Equal', category: 'electronics', price: 10, quantity: 5, tags: [], reorderLevel: 5 },
            { id: '2', sku: 'SKU-2', name: 'Normal', category: 'grocery', price: 10, quantity: 10, tags: [], reorderLevel: 2 },
        ];

        const lowStock = getLowStockProducts(products);
        expect(lowStock).toHaveLength(1);
        expect(lowStock[0]?.name).toBe('Equal');

        expect(getLowStockProducts([])).toEqual([]);
    });

    it('returns top 5 products by value in descending order, handles fewer items, and preserves input', () => {
        // value = price * quantity = (i + 1) * 10 * 2 = (i + 1) * 20
        // values: p0=20, p1=40, p2=60, p3=80, p4=100, p5=120, p6=140
        const sevenProducts: Product[] = Array.from({ length: 7 }, (_, i) => ({
            id: `p${i}`,
            sku: `SKU-${i}`,
            name: `Product ${i}`,
            category: 'electronics',
            price: (i + 1) * 10,
            quantity: 2,
            tags: [],
            reorderLevel: 1,
        }));

        const snapshot = structuredClone(sevenProducts);
        const top5 = getTopProductsByValue(sevenProducts);
        expect(top5).toHaveLength(5);
        expect(top5.map((p) => p.id)).toEqual(['p6', 'p5', 'p4', 'p3', 'p2']);
        expect(sevenProducts).toEqual(snapshot);

        const threeProducts = sevenProducts.slice(0, 3);
        const top3 = getTopProductsByValue(threeProducts);
        expect(top3).toHaveLength(3);
        expect(top3.map((p) => p.id)).toEqual(['p2', 'p1', 'p0']);
    });

    it('collects all unique tags with zero duplication', () => {
        const products: Product[] = [
            { id: '1', sku: '1', name: 'A', category: 'electronics', price: 1, quantity: 1, tags: ['tech', 'sale'], reorderLevel: 0 },
            { id: '2', sku: '2', name: 'B', category: 'electronics', price: 1, quantity: 1, tags: ['sale', 'new'], reorderLevel: 0 },
        ];
        const tags = getAllTags(products);
        expect(tags).toEqual(expect.arrayContaining(['tech', 'sale', 'new']));
        expect(new Set(tags).size).toBe(tags.length);
        expect(tags).toHaveLength(3);
    });

    it('returns empty array when no product has tags', () => {
        const products: Product[] = [
            { id: '1', sku: '1', name: 'A', category: 'home', price: 1, quantity: 1, tags: [], reorderLevel: 0 },
        ];
        expect(getAllTags(products)).toEqual([]);
    });

    it('maps products to their names', () => {
        const products = [make({ id: '1', name: 'Milk' }), make({ id: '2', name: 'Bread' })];
        expect(getProductNames(products)).toEqual(['Milk', 'Bread']);
        expect(getProductNames([])).toEqual([]);
    });

    it('groups products by category and native vs reduce methods match', () => {
        const products: Product[] = [
            { id: '1', sku: '1', name: 'A', category: 'electronics', price: 1, quantity: 1, tags: [], reorderLevel: 0 },
            { id: '2', sku: '2', name: 'B', category: 'grocery', price: 1, quantity: 1, tags: [], reorderLevel: 0 },
        ];
        expect(groupByCategoryNative(products)).toEqual(groupByCategoryReduce(products));
    });

    it('both grouping methods return an empty object for empty input', () => {
        expect(groupByCategoryNative([])).toEqual({});
        expect(groupByCategoryReduce([])).toEqual({});
    });

    it('demonstrates reduceRight building reverse string [A, B, C] -> "C, B, A" and empty array -> ""', () => {
        const products: Product[] = [
            { id: '1', sku: '1', name: 'A', category: 'electronics', price: 1, quantity: 1, tags: [], reorderLevel: 0 },
            { id: '2', sku: '2', name: 'B', category: 'electronics', price: 1, quantity: 1, tags: [], reorderLevel: 0 },
            { id: '3', sku: '3', name: 'C', category: 'electronics', price: 1, quantity: 1, tags: [], reorderLevel: 0 },
        ];
        expect(getProductNamesInReverseString(products)).toBe('C, B, A');
        expect(getProductNamesInReverseString([])).toBe('');
    });

    it('handles an empty product name in the middle without breaking the string', () => {
        const products: Product[] = [
            { id: '1', sku: '1', name: 'A', category: 'home', price: 1, quantity: 1, tags: [], reorderLevel: 0 },
            { id: '2', sku: '2', name: '', category: 'home', price: 1, quantity: 1, tags: [], reorderLevel: 0 },
            { id: '3', sku: '3', name: 'C', category: 'home', price: 1, quantity: 1, tags: [], reorderLevel: 0 },
        ];
        expect(getProductNamesInReverseString(products)).toBe('C, , A');
    });

    it('proves that functional operations do not mutate original array (Read-Only)', () => {
        const products: Product[] = [
            { id: '1', sku: '1', name: 'A', category: 'electronics', price: 10, quantity: 2, tags: ['test'], reorderLevel: 1 },
            { id: '2', sku: '2', name: 'B', category: 'grocery', price: 5, quantity: 1, tags: ['test'], reorderLevel: 2 },
        ];
        const snapshot = structuredClone(products);

        calculateInventoryValue(products);
        getLowStockProducts(products);
        getTopProductsByValue(products);
        getAllTags(products);
        getProductNames(products);
        groupByCategoryNative(products);
        groupByCategoryReduce(products);
        getProductNamesInReverseString(products);

        expect(products).toEqual(snapshot);
    });
});