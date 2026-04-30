import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const IMPACT_AUTO_TRIGGER_DELAY_MS = Number(
  process.env.NEXT_PUBLIC_IMPACT_AUTO_TRIGGER_DELAY_MS ?? '1500'
)

export const INITIATIVES_AUTO_TRIGGER_DELAY_MS = Number(
  process.env.NEXT_PUBLIC_INITIATIVES_AUTO_TRIGGER_DELAY_MS ?? '500'
)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
