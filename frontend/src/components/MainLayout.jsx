import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-white">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className={`
          flex-1 transition-all duration-300
          ${collapsed ? 'ml-[90px]' : 'ml-[280px]'}
        `}
      >
        <div className="min-h-screen p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}