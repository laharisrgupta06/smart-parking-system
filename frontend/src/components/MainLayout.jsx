import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-800/80 bg-slate-950/80 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 p-2 text-slate-200 shadow-sm transition hover:border-cyan-500/40 hover:text-cyan-300"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-cyan-400/90">SmartPark</span>
          <span className="w-10" aria-hidden />
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
