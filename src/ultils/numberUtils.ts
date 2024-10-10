export const formatCurrencyVND = (amount: number): string => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return formatter.format(amount);
};

export const formatNumber = (value: number): string => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    currency: 'VND',
  });

  return formatter.format(value);
};

export const formatterNumber = (val?: string): string => {
  if (!val) return '0';

  return `${val}`
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    .replace(/\.(?=\d{0,2}$)/g, ',');
};

export const parserNumber = (val?: string) => {
  if (!val) return 0;

  return Number.parseFloat(
    val.replace(/\$\s?|(\.*)/g, '').replace(/(\,{1})/g, '.'),
  ).toFixed(2);
};

export const convertToMoneyFormat = (number: number) => {
  const reversedNumberString = String(number).split('').reverse().join('');

  let moneyFormat = '';

  for (let i = 0; i < reversedNumberString.length; i++) {
    moneyFormat += reversedNumberString[i];
    if ((i + 1) % 3 === 0 && i + 1 !== reversedNumberString.length) {
      moneyFormat += '.';
    }
  }

  return moneyFormat.split('').reverse().join('');
};

export const formatNumberWithDots = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const convertStringToNumber = (str: string): number => {
  if (!str) return 0;
  const cleanedStr = str.replace(/\./g, '');

  return parseInt(cleanedStr, 10);
};
