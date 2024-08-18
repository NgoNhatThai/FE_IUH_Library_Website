import { formatNumber } from './number';

export const convertNumberToNumberText = (number?: number): string => {
  const THOUSAND_LIMIT = 1000;
  const MILLION_LIMIT = THOUSAND_LIMIT * 1000;
  const BILLION_LIMIT = MILLION_LIMIT * 1000;

  if (!number) return '';

  const absoluteNumber = Math.abs(number);

  if (absoluteNumber < THOUSAND_LIMIT) {
    return formatNumber(number);
  }

  if (absoluteNumber < MILLION_LIMIT) {
    return (number / THOUSAND_LIMIT).toFixed(2).replace(/\.?0+$/, '') + 'k';
  }

  if (absoluteNumber < BILLION_LIMIT) {
    return (number / MILLION_LIMIT).toFixed(2).replace(/\.?0+$/, '') + 'tr';
  }

  return (number / BILLION_LIMIT).toFixed(2).replace(/\.?0+$/, '') + 'T';
};
