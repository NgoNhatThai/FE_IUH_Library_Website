import React from 'react';

import { twMerge } from 'tailwind-merge';

interface Size {
  sm?: string;
  md?: string;
  lg?: string;
}

export interface BadgeStatus {
  success?: string;
  info?: string;
  danger?: string;
  warning?: string;
  default?: string;
}

export interface BadgeProps {
  color?: string;
  status?: keyof BadgeStatus | string;
  size?: keyof Size;
  title?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const sizes: Size = {
  sm: 'text-[13px] py-1 px-3',
  md: 'text-sm py-2 px-4',
  lg: 'text-lg py-3 px-6',
};

const statuses: BadgeStatus = {
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger',
  warning: 'bg-warning/10 text-warning',
  info: 'bg-sky-100 text-sky-500',
  default: 'bg-gray-200 text-black',
};

const Badge = ({
  title,
  className,
  status = 'default',
  size = 'sm',
  style,
  color,
}: BadgeProps) => {
  return (
    <div
      style={style}
      className={twMerge(
        `w-fit rounded font-semibold ${
          color ||
          (status ? statuses?.[status as keyof BadgeStatus]?.toString() : '')
        } ${sizes[size]}`,
        className,
      )}
    >
      {title}
    </div>
  );
};

export default Badge;
