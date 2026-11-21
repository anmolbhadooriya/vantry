import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { formatCurrency, formatNumber, formatCompact } from '../src/lib/format.js';

describe('Vantry Currency Formatter', () => {
  test('formats whole rupee amounts with no decimals', () => {
    assert.equal(formatCurrency(2999900), '₹29,999');
    assert.equal(formatCurrency(10990000), '₹1,09,900');
    assert.equal(formatCurrency(0), '₹0');
  });

  test('formats amounts with fractional paise with exactly 2 decimals', () => {
    assert.equal(formatCurrency(14950), '₹149.50');
    assert.equal(formatCurrency(9995), '₹99.95');
  });

  test('formats negative amounts properly', () => {
    assert.equal(formatCurrency(-50000), '-₹500');
  });

  test('formats large crore-level amounts with Indian grouping', () => {
    assert.equal(formatCurrency(12345678900), '₹12,34,56,789');
  });

  test('throws TypeError on non-integer input', () => {
    assert.throws(() => formatCurrency(123.45), TypeError);
    assert.throws(() => formatCurrency('2999900'), TypeError);
    assert.throws(() => formatCurrency(null), TypeError);
    assert.throws(() => formatCurrency(undefined), TypeError);
    assert.throws(() => formatCurrency(NaN), TypeError);
  });

  test('formatNumber and formatCompact', () => {
    assert.equal(formatNumber(100000), '1,00,000');
    assert.equal(formatCompact(15000), '15K');
    assert.equal(formatCompact(250000), '2.5L');
    assert.equal(formatCompact(15000000), '1.5Cr');
  });
});
