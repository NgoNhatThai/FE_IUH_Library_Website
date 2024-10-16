import dayjs from 'dayjs';
import { Moment } from 'moment';

import { isSameDate } from '@/ultils/dateUtils';

import { ControlRangerPickerKey, DateControl } from '..';
import { RangeValue } from '@/types';

interface RangePickerFooterProps {
  value?: RangeValue<dayjs.Dayjs> | any;
  onChangeValue?: (values: [Moment, Moment] | []) => void;
  disableKey?: ControlRangerPickerKey[] | ControlRangerPickerKey.ALL;
  closeDateRangePicker: () => void;
  defaultPickerTime?: ControlRangerPickerKey;
  onChangeFooterValue?: ControlRangerPickerKey;
  controls?: DateControl[] | [];
  setTimeLabelShow?: (value: boolean) => void;
  setTimeLabel?: (value: string) => void;
}

const RangePickerFooter = ({
  value,
  onChangeValue,
  controls,
  closeDateRangePicker,
  setTimeLabelShow,
  setTimeLabel,
}: RangePickerFooterProps) => {
  const startDate = value?.[0];

  const endDate = value?.[1];

  return (
    <div className="my-2 grid grid-cols-3 gap-2">
      {controls?.map((control, index) => {
        const isActive =
          isSameDate(control.value[0]?.toDate(), startDate?.toDate()) &&
          isSameDate(control.value[1]?.toDate(), endDate?.toDate());

        if (isActive) {
          setTimeLabel?.(control.label);
        }

        return (
          <div
            key={index}
            className={`cursor-pointer rounded-lg border border-[#4096ff] text-center text-[#4096ff] transition-all hover:bg-[#4096ff] hover:text-white ${
              controls?.length % 3 !== 0 && 'last:col-span-3'
            } ${isActive && 'bg-[#4096ff] text-white'}`}
            onClick={() => {
              //Check click event, if the value is the same as the current value, set label, set show then close the date range picker
              onChangeValue?.(
                Array.isArray(control.value) &&
                  control.value?.[0] &&
                  control?.value?.[1]
                  ? [control.value[0], control.value[1]]
                  : [],
              );
              setTimeLabel?.(control.label);
              setTimeLabelShow?.(true);
              closeDateRangePicker();
            }}
          >
            {control.label}
          </div>
        );
      })}
    </div>
  );
};

export default RangePickerFooter;
