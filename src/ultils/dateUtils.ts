import moment from 'moment';

export const DATE_FORMAT_DDMMYYYYHHMMSS = 'DD/MM/YYYY HH:mm:ss';
export const DATE_FORMAT_DDMMYYYYHHMM = 'DD/MM/YYYY HH:mm';
export const DATE_FORMAT_DDMMYYYY = 'DD/MM/YYYY';
export const DATE_FORMAT_DD_MM_YYYY = 'DD-MM-YYYY';
export const DATE_FORMAT_YYYYMMDD = 'YYYY-MM-DD';
export const DATE_FORMAT_YYYYMMDDTHHMMSS = 'YYYY-MM-DDTHH:mm:ss';
export const DATE_FORMAT_YYYYMMDDTHHMMSSZ = 'YYYY-MM-DDTHH:mm:ssZ';
export const DATE_FORMAT_DDMMYYYYTHHMMSS = 'DD-MM-YYYY HH:mm:ss';

export const DATE_FORMAT_DDMMYYYY_THHMMSS = 'DD-MM-YYYY HH:mm:ss';

export const DATE_FORMAT_HHMMSS_DDMMYYYY = 'HH:mm:ss DD-MM-YYYY';

export const DATE_FORMAT_HHMM_DDMMYYYY = 'HH:mm DD-MM-YYYY';

export const DATE_FORMAT_DDMMYYYYTHHMM = 'DD-MM-YYYY HH:mm';

export const DATE_FORMAT_HHMM = 'HH:mm';
export const DATE_FORMAT_HHMMSS = 'HH:mm:ss';
export const DATE_FORMAT_MMYYYY = 'MM-YYYY';

export const CURRENT_DAY = new Date();

export const formatDate = (
  date: Date | string | number,
  format: string,
): string => {
  return moment(date).format(format);
};

export function subtractDays(date: Date, days: number | string) {
  return moment(date).subtract(days, 'days');
}

export function addDays(date: Date, days: number | string) {
  return moment(date).add(days, 'days');
}

export function compareDates(startDate: string, endDate: string) {
  const start = new Date(startDate);

  const end = new Date(endDate);

  return end > start;
}

export const TO_DAY = {
  startDate: moment().startOf('day'),
  endDate: moment().endOf('day'),
};

export const YESTERDAY = {
  startDate: moment().add(-1, 'days').startOf('day'),
  endDate: moment().add(-1, 'days').endOf('day'),
};

export const currentWeekFirstDate = (current: Date, format?: string) => {
  const instance = moment(current, format);

  return instance.isValid() ? instance.startOf('isoWeek') : null;
};

export const currentWeekLastDate = (current: Date, format?: string) => {
  const instance = moment(current, format);

  return instance.isValid() ? instance.endOf('isoWeek').startOf('day') : null;
};

export const lastWeekFirstDate = (current: Date, format?: string) => {
  const instance = moment(current, format);

  if (!instance.isValid()) {
    return null;
  }

  const lastWeekDate = instance.subtract(1, 'weeks');

  return lastWeekDate.startOf('isoWeek');
};

export const lastWeekLastDate = (current: Date, format?: string) => {
  const instance = moment(current, format);

  if (!instance.isValid()) {
    return null;
  }

  const lastWeekDate = instance.subtract(1, 'weeks');

  return lastWeekDate.endOf('isoWeek').startOf('day');
};

export const currentMonthFirstDate = (current: Date, format?: string) => {
  const instance = moment(current, format);

  return instance.isValid() ? instance.startOf('month') : null;
};

export const currentMonthLastDate = (current: Date, format?: string) => {
  const instance = moment(current, format);

  return instance.isValid() ? instance.endOf('month').endOf('day') : null;
};

export const lastMonthStartDate = (current: Date, format?: string) => {
  const instance = moment(current, format);

  if (!instance.isValid()) {
    return null;
  }

  const lastMonthDate = instance.subtract(1, 'months');

  return lastMonthDate.startOf('month');
};

export const lastMonthEndDate = (current: Date, format?: string) => {
  const instance = moment(current, format);

  if (!instance.isValid()) {
    return null;
  }

  const lastMonthDate = instance.subtract(1, 'months');

  return lastMonthDate.endOf('month');
};

export const currentYearFirstDate = (current: Date, format?: string) => {
  const instance = moment(current, format);

  return instance.isValid() ? instance.startOf('year') : null;
};

export const currentYearLastDate = (current: Date, format?: string) => {
  const instance = moment(current, format);

  return instance.isValid() ? instance.endOf('year').endOf('day') : null;
};

export const everyTime = () => {
  return moment('1900/01/01 00:00:00');
};

export const isSameDate = (date1?: Date, date2?: Date) => {
  if (!date1 || !date2) {
    return false;
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
