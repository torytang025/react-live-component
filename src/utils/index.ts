import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNoRefererImageUrl = (url: string) => {
  if (url !== undefined) {
    return url.replace(/^(http)[s]*(:\/\/)/, 'https://images.weserv.nl/?url=');
  }
};
