import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS, CATEGORIES } from '../src/data/products.js';
import { brand } from '../src/config/brand.js';

describe('Vantry Product Catalogue & Brand Integrity', () => {
  test('has exactly 16 products across 4 main categories', () => {
    assert.equal(PRODUCTS.length, 16);
    const categoryIds = CATEGORIES.filter((c) => c.id !== 'all').map((c) => c.id);
    assert.deepEqual(categoryIds, ['laptops', 'audio', 'displays', 'peripherals']);

    categoryIds.forEach((catId) => {
      const prodsInCat = PRODUCTS.filter((p) => p.category === catId);
      assert.equal(prodsInCat.length, 4, `Category ${catId} must have 4 products`);
    });
  });

  test('all prices are strictly positive integer paise', () => {
    PRODUCTS.forEach((product) => {
      assert(
        Number.isInteger(product.price) && product.price > 0,
        `Product ${product.id} price must be positive integer paise`
      );
      if (product.originalPrice) {
        assert(
          Number.isInteger(product.originalPrice) && product.originalPrice >= product.price,
          `Product ${product.id} originalPrice must be >= price`
        );
      }
    });
  });

  test('every product has required showroom metadata and specs', () => {
    PRODUCTS.forEach((p) => {
      assert(p.id && typeof p.id === 'string', `${p.name} missing id`);
      assert(p.name && typeof p.name === 'string', `${p.id} missing name`);
      assert(p.brand && typeof p.brand === 'string', `${p.id} missing brand`);
      assert(p.category && typeof p.category === 'string', `${p.id} missing category`);
      assert(p.tagline && typeof p.tagline === 'string', `${p.id} missing tagline`);
      assert(p.description && typeof p.description === 'string', `${p.id} missing description`);
      assert(p.image && p.image.startsWith('http'), `${p.id} missing image URL`);
      assert(
        ['in_stock', 'low_stock', 'out_of_stock'].includes(p.stockStatus),
        `${p.id} invalid stockStatus`
      );
      assert(Array.isArray(p.keySpecs) && p.keySpecs.length >= 3, `${p.id} needs keySpecs`);
      assert(p.specs && typeof p.specs === 'object', `${p.id} needs specs object`);
      assert(p.specs['Category Group'], `${p.id} specs needs Category Group`);
    });
  });

  test('brand config matches Vantry identity', () => {
    assert.equal(brand.name, 'Vantry');
    assert.equal(brand.tagline, 'See the difference.');
    assert.equal(brand.currency, 'INR');
    assert.equal(brand.currencySymbol, '₹');
  });
});
