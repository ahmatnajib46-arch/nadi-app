import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useUiStore } from '@/stores/uiStore'

import { App } from './App'

function getGlobalNav() {
  return screen.getByRole('navigation', { name: 'Navigasi utama' })
}

function clickGlobalFace(label: 'Keuangan' | 'Harian' | 'Project') {
  fireEvent.click(within(getGlobalNav()).getByRole('button', { name: label }))
}

function swipe(
  element: HTMLElement,
  start: { x: number; y: number },
  end: { x: number; y: number },
) {
  fireEvent.touchStart(element, {
    touches: [{ clientX: start.x, clientY: start.y }],
  })
  fireEvent.touchMove(element, {
    touches: [{ clientX: end.x, clientY: end.y }],
  })
  fireEvent.touchEnd(element, {
    changedTouches: [{ clientX: end.x, clientY: end.y }],
  })
}

describe('App shell', () => {
  beforeEach(() => {
    useUiStore.setState({ activeFace: 0 })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('menampilkan tiga item navigasi global dan berpindah wajah lewat tap', () => {
    render(<App />)

    const nav = getGlobalNav()
    expect(within(nav).getByRole('button', { name: 'Keuangan' })).toBeInTheDocument()
    expect(within(nav).getByRole('button', { name: 'Harian' })).toBeInTheDocument()
    expect(within(nav).getByRole('button', { name: 'Project' })).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'Beranda' })).toBeInTheDocument()

    clickGlobalFace('Harian')
    expect(screen.getByRole('heading', { name: 'Progress Harian' })).toBeInTheDocument()

    clickGlobalFace('Project')
    expect(screen.getByRole('heading', { name: 'Project' })).toBeInTheDocument()
  })

  it('menampilkan navigasi bawah hanya pada wajah Keuangan', () => {
    render(<App />)

    expect(screen.getByRole('navigation', { name: 'Navigasi Keuangan' })).toBeInTheDocument()

    clickGlobalFace('Harian')
    expect(screen.queryByRole('navigation', { name: 'Navigasi Keuangan' })).not.toBeInTheDocument()

    clickGlobalFace('Project')
    expect(screen.queryByRole('navigation', { name: 'Navigasi Keuangan' })).not.toBeInTheDocument()
  })

  it('mengganti panel internal Keuangan lewat navigasi bawah', () => {
    render(<App />)

    const bottomNav = screen.getByRole('navigation', { name: 'Navigasi Keuangan' })

    fireEvent.click(within(bottomNav).getByRole('button', { name: 'Scan' }))
    expect(screen.getByRole('heading', { name: 'Scan' })).toBeInTheDocument()
    expect(screen.getByText(/Segera hadir/)).toBeInTheDocument()

    fireEvent.click(within(bottomNav).getByRole('button', { name: 'Keuangan' }))
    expect(screen.getByRole('heading', { name: 'Keuangan' })).toBeInTheDocument()
  })

  it('menampilkan sapaan, menciut setelah ±3 detik, lalu mengembang lagi saat wajah berganti', () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })

    render(<App />)

    const header = screen.getByTestId('adaptive-header')
    expect(header).toHaveAttribute('data-expanded', 'true')
    expect(screen.getByText(/Selamat (pagi|siang|sore|malam)/)).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(header).toHaveAttribute('data-expanded', 'false')

    clickGlobalFace('Harian')
    expect(header).toHaveAttribute('data-expanded', 'true')
  })

  it('berpindah wajah dengan swipe horizontal kiri dan kanan', () => {
    render(<App />)

    const pager = screen.getByTestId('face-pager')

    swipe(pager, { x: 400, y: 120 }, { x: 100, y: 125 })
    expect(screen.getByRole('heading', { name: 'Progress Harian' })).toBeInTheDocument()

    swipe(pager, { x: 100, y: 120 }, { x: 400, y: 118 })
    expect(screen.getByRole('heading', { name: 'Beranda' })).toBeInTheDocument()
  })

  it('tidak berpindah wajah saat geser vertikal', () => {
    render(<App />)

    const pager = screen.getByTestId('face-pager')

    swipe(pager, { x: 300, y: 100 }, { x: 305, y: 420 })

    expect(screen.getByRole('heading', { name: 'Beranda' })).toBeInTheDocument()
  })

  it('mempertahankan posisi scroll wajah Keuangan saat berpindah wajah', () => {
    render(<App />)

    const scrollContainer = screen.getByTestId('face-scroll-finance')
    scrollContainer.scrollTop = 140
    expect(scrollContainer.scrollTop).toBe(140)

    clickGlobalFace('Harian')
    clickGlobalFace('Keuangan')

    expect(screen.getByTestId('face-scroll-finance')).toBe(scrollContainer)
    expect(scrollContainer.scrollTop).toBe(140)
  })

  it('mendukung navigasi wajah dengan tombol panah saat fokus di dalam shell', () => {
    render(<App />)

    const financeButton = within(getGlobalNav()).getByRole('button', { name: 'Keuangan' })
    financeButton.focus()

    fireEvent.keyDown(financeButton, { key: 'ArrowRight' })
    expect(screen.getByRole('heading', { name: 'Progress Harian' })).toBeInTheDocument()

    fireEvent.keyDown(financeButton, { key: 'ArrowLeft' })
    expect(screen.getByRole('heading', { name: 'Beranda' })).toBeInTheDocument()
  })
})
