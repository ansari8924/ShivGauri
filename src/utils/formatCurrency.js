import { CONFIG } from '../constants/config';

export const formatCurrency = (amountInPaise) => {
  if (amountInPaise == null) return '';
  const amountInRupees = amountInPaise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: CONFIG.CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amountInRupees);
};
