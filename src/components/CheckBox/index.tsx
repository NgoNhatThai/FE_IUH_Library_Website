import React, { useId } from 'react';

interface CheckBoxProps {
  checked?: boolean;
  onChange?(checked: boolean): void;
  label?: string;
}

const CheckBox = ({ checked, onChange, label }: CheckBoxProps) => {
  const checkBoxId = useId();
  return (
    <div className="flex items-center">
      <input
        className="checkbox-input"
        id={checkBoxId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label
        htmlFor={checkBoxId}
        className="text-default-light dark:text-default-dark"
      >
        {label && (
          <div className="text-color-light dark:text-color-dark pl-2">
            {label}
          </div>
        )}
      </label>
    </div>
  );
};

export default CheckBox;
