import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from './App'

describe('App', () => {
  it('menampilkan identitas aplikasi', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'NADI' })).toBeInTheDocument()
  })

  it('menampilkan keterangan bahwa fondasi proyek siap', () => {
    render(<App />)

    expect(screen.getByText(/Fondasi proyek siap/i)).toBeInTheDocument()
  })
})
