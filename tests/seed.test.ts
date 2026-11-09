// import { describe, expect, it } from 'vitest';
// import { generateSeedProducts } from '../src/data/seed.js';

// describe('Seed Generator', () => {
//   it('generates the exact requested number of products', () => {
//     const products = generateSeedProducts(50);
//     expect(products).toHaveLength(50);
//   });

//   it('ensures all product SKUs are unique', () => {
//     const products = generateSeedProducts(50);
//     const skus = products.map((p) => p.sku);
//     const uniqueSkus = new Set(skus);

//     expect(uniqueSkus.size).toBe(products.length);
//   });
// });
import { describe, expect, it } from 'vitest';
import { generateSeedProducts } from '../src/data/seed.js';
import { PRODUCT_CATEGORIES } from '../src/interfaces/product.js';

describe('generateSeedProducts', () => {
    it('generates the exact requested number of products', () => {
        expect(generateSeedProducts(50)).toHaveLength(50);
    });

    it('defaults to 50 products', () => {
        expect(generateSeedProducts()).toHaveLength(50);
    });

    it('handles zero products', () => {
        expect(generateSeedProducts(0)).toEqual([]);
    });

    it('generates unique SKUs and ids', () => {
        const products = generateSeedProducts(50);
        expect(new Set(products.map((p) => p.sku)).size).toBe(products.length);
        expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    });

    it('is deterministic: same input gives the same output', () => {
        expect(generateSeedProducts(50)).toEqual(generateSeedProducts(50));
    });

    it('covers every category', () => {
        const categories = new Set(generateSeedProducts(50).map((p) => p.category));
        expect(categories.size).toBe(PRODUCT_CATEGORIES.length);
    });

    it('produces valid quantities and prices', () => {
        for (const p of generateSeedProducts(50)) {
            expect(p.quantity).toBeGreaterThanOrEqual(1);
            expect(p.quantity).toBeLessThanOrEqual(50);
            expect(p.price).toBeGreaterThan(0);
        }
    });
});