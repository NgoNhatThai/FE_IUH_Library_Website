'use client';
import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function NextProgressBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#29D"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
