import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Vitest berjalan tanpa globals, sehingga auto-cleanup React Testing Library
// tidak aktif otomatis. Cleanup eksplisit mencegah DOM antar-test terakumulasi.
afterEach(() => {
  cleanup()
})
