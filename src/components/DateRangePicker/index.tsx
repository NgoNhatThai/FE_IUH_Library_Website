'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import dayjs from 'dayjs';

import RangePickerFooter from './component';

type CustomDateRangePickerProps = RangePickerProps & {
  disableKey?: ControlRangerPickerKey[] | ControlRangerPickerKey.ALL;
  defaultPickerTime?: ControlRangerPickerKey;
};

const { RangePicker } = DatePicker;

export enum ControlRangerPickerKey {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  THIS_WEEK = 'THIS_WEEK',
  LAST_WEEK = 'LAST_WEEK',
  THIS_MONTH = 'THIS_MONTH',
  LAST_MONTH = 'LAST_MONTH',
  THIS_YEAR = 'THIS_YEAR',
  ALL = 'ALL',
}

import moment from 'moment';

import {
  currentMonthFirstDate,
  currentMonthLastDate,
  currentWeekFirstDate,
  currentWeekLastDate,
  // currentYearFirstDate,
  // currentYearLastDate,
  DATE_FORMAT_DDMMYYYYHHMM,
  lastMonthEndDate,
  lastMonthStartDate,
  lastWeekFirstDate,
  lastWeekLastDate,
  TO_DAY,
  YESTERDAY,
} from '@/ultils/dateUtils';
import { isSameDate } from '@/ultils/dateUtils';

export interface DateControl {
  label: string;
  value: [moment.Moment, moment.Moment];
  key: ControlRangerPickerKey;
}

const DateRangePicker = (props: CustomDateRangePickerProps) => {
  const { onChange, disableKey, defaultPickerTime } = props;

  const rangePickerRef = useRef<any>();

  const closeDateRangePicker = () => {
    if (rangePickerRef.current) {
      if (timeLabel !== '') {
        setTimeLabelShow(true);
      }

      rangePickerRef.current.blur();
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsDatePanelShow(open);
    // if (props.value && props.value[0] && props.value[1]) {
    //   onChange?.(props.value, [
    //     props.value[0].format(DATE_FORMAT_DDMMYYYYHHMM),
    //     props.value[1].format(DATE_FORMAT_DDMMYYYYHHMM),
    //   ]);
    // }
  };

  const currentDate = new Date();

  const controls = useMemo(() => {
    return [
      {
        label: 'Hôm nay',
        value: [TO_DAY.startDate, TO_DAY.endDate],
        key: ControlRangerPickerKey.TODAY,
      },
      {
        label: 'Hôm qua',
        value: [YESTERDAY.startDate, YESTERDAY.endDate],
        key: ControlRangerPickerKey.YESTERDAY,
      },
      {
        label: 'Tuần này',
        value: [
          currentWeekFirstDate(currentDate),
          currentWeekLastDate(currentDate),
        ],
        key: ControlRangerPickerKey.THIS_WEEK,
      },
      {
        label: 'Tuần trước',
        value: [lastWeekFirstDate(currentDate), lastWeekLastDate(currentDate)],
        key: ControlRangerPickerKey.LAST_WEEK,
      },
      {
        label: 'Tháng này',
        value: [
          currentMonthFirstDate(currentDate),
          currentMonthLastDate(currentDate),
        ],
        key: ControlRangerPickerKey.THIS_MONTH,
      },
      {
        label: 'Tháng trước',
        value: [lastMonthStartDate(currentDate), lastMonthEndDate(currentDate)],
        key: ControlRangerPickerKey.LAST_MONTH,
      },
      // {
      //   label: 'Năm nay',
      //   value: [
      //     currentYearFirstDate(currentDate),
      //     currentYearLastDate(currentDate),
      //   ],
      //   key: ControlRangerPickerKey.THIS_YEAR,
      // },
      // {
      //   label: 'Mọi lúc',
      //   value: [null, null],
      // },
    ].filter((item) =>
      disableKey === ControlRangerPickerKey.ALL
        ? false
        : !disableKey?.includes(item.key),
    );
  }, [currentDate]);

  // Show date range picker or time label
  const [isTimeLabelShow, setTimeLabelShow] = useState<boolean>(false);

  const [isDatePanelShow, setIsDatePanelShow] = useState<boolean>(false);

  const [timeLabel, setTimeLabel] = useState('');

  useEffect(() => {
    //  When re-render page, check the default value of the date range picker and display the label
    controls.map((control) => {
      if (
        props.value &&
        isSameDate(control.value[0]!.toDate(), props.value[0]?.toDate()) &&
        isSameDate(control.value[1]!.toDate(), props.value[1]?.toDate())
      ) {
        setTimeLabel(control.label);
        setTimeLabelShow(true);
      }
    });
  }, [props.onChange]);

  useEffect(() => {
    // When use remove all filter, check url params (props.value) and remove time label
    if (props.value && props.value[0] === null && props.value[1] === null) {
      setTimeLabelShow(false);
      setIsDatePanelShow(false);
    }
  }, [props.value]);

  return (
    <>
      {isTimeLabelShow && timeLabel ? (
        <div
          className="z-99 relative flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm hover:border-sky-500"
          onClick={() => {
            setTimeLabelShow(false);
            setIsDatePanelShow(true);
            setTimeLabel('');
          }}
        >
          <span className="text-sm">{timeLabel}</span>
          <div className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg bg-gray-200">
            <CalendarOutlined className="h-[14px] w-[14px]" />
          </div>
        </div>
      ) : (
        <RangePicker
          ref={rangePickerRef}
          open={isDatePanelShow}
          onClick={() => {
            setIsDatePanelShow(true);
          }}
          onOpenChange={handleOpenChange}
          id="custom-range-picker"
          renderExtraFooter={() => (
            <RangePickerFooter
              value={props.value}
              onChangeValue={([startDate, endDate]) => {
                onChange?.(
                  startDate && endDate
                    ? [dayjs(startDate?.toString()), dayjs(endDate?.toString())]
                    : [null, null],
                  [DATE_FORMAT_DDMMYYYYHHMM, DATE_FORMAT_DDMMYYYYHHMM],
                );
              }}
              closeDateRangePicker={closeDateRangePicker}
              disableKey={disableKey}
              defaultPickerTime={defaultPickerTime}
              controls={controls as DateControl[]}
              setTimeLabelShow={setTimeLabelShow}
              setTimeLabel={setTimeLabel}
            />
          )}
          {...props}
          onChange={(dates, dateStrings) => {
            const prevEndDate = props.value?.[1]?.toDate();

            props?.onChange && props?.onChange(dates, dateStrings);
            if (
              prevEndDate &&
              dates &&
              !isSameDate(prevEndDate, dates[1]?.toDate())
            ) {
              // Close date range picker when select date because we now handle open/close by useState (check end date change)
              setIsDatePanelShow(false);
            }
          }}
        />
      )}
    </>
  );
};

export default DateRangePicker;
