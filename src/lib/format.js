/**
 * Vantry formatting utilities.
 * All monetary amounts are stored in integer paise (1 Rupee = 100 paise).
 */

/**
 * Format an integer paise value into Indian Rupee currency (₹) string.
 * Uses Indian digit grouping (e.g. ₹1,09,900).
 * Displays zero decimals for whole rupee amounts, exactly 2 decimals otherwise.
 *
 * @param {number} paise - Integer amount in paise
 * @returns {string} Formatted INR currency string
 * @throws {TypeError} If paise is not an integer
 */
export function formatCurrency(paise) {
  if (!Number.isInteger(paise)) {
    throw new TypeError(`Amount in paise must be an integer, received: ${paise} (${typeof paise})`);
  }

  const rupees = paise / 100;
  const isWhole = paise % 100 === 0;

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: isWhole ? 0 : 2,
  }).format(rupees);
}

/**
 * Format a number using Indian locale grouping.
 * @param {number} num 
 * @returns {string}
 */
export function formatNumber(num) {
  if (typeof num !== 'number' || isNaN(num)) {
    return '0';
  }
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Compact Indian format (e.g. 1.2K, 3.4L, 1.5Cr).
 * @param {number} num 
 * @returns {string}
 */
export function formatCompact(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  if (num >= 10000000) return `${(num / 10000000).toFixed(1).replace(/\.0$/, '')}Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(1).replace(/\.0$/, '')}L`;
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return num.toString();
}
