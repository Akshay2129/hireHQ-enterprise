import { Signal, signal, effect } from '@angular/core';

export function debouncedSignal<T>(input: Signal<T>, timeOutMs = 0): Signal<T> {
  const debounceSignal = signal(input());
  effect(() => {
    const value = input();
    const timeout = setTimeout(() => {
      debounceSignal.set(value);
    }, timeOutMs);
    return () => {
      clearTimeout(timeout);
    };
  });
  return debounceSignal;
}

export function calculateDaysAgo(dateString: string): number {
  if (!dateString) return 0;
  const inputDate = new Date(dateString); // Parse the input date string
  const today = new Date(); // Current date

  // Normalize both dates to midnight to avoid time discrepancies
  const inputDateMidnight = new Date(inputDate.setHours(0, 0, 0, 0));
  const todayMidnight = new Date(today.setHours(0, 0, 0, 0));

  // Calculate the difference in time (milliseconds)
  const differenceInTime = todayMidnight.getTime() - inputDateMidnight.getTime();

  // Convert time difference to days
  return Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
}
