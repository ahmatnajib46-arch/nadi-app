/**
 * Sapaan personal berdasarkan jam lokal perangkat.
 *
 * - 05–10: Selamat pagi
 * - 11–14: Selamat siang
 * - 15–18: Selamat sore
 * - 19–04: Selamat malam
 */
export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours()

  if (hour >= 5 && hour <= 10) return 'Selamat pagi'
  if (hour >= 11 && hour <= 14) return 'Selamat siang'
  if (hour >= 15 && hour <= 18) return 'Selamat sore'
  return 'Selamat malam'
}
