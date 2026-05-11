import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/vehicle-entry', label: 'Vehicle Entry', icon: '🚘' },
  { to: '/parking-slots', label: 'Parking Slots', icon: '🅿️' },
  { to: '/active-tickets', label: 'Active Tickets', icon: '🎫' },
  { to: '/vehicle-exit', label: 'Vehicle Exit', icon: '🚪' },
  { to: '/admin', label: 'Admin Panel', icon: '⚙️' },
]

export default function Sidebar({
  collapsed,
  setCollapsed,
}) {
  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 h-screen
        border-r border-white/10
        bg-[#111827]
        transition-all duration-300
        ${collapsed ? 'w-[90px]' : 'w-[280px]'}
      `}
    >

      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-6">

        {!collapsed && (
          <div>
            <p className="text-xs tracking-[0.3em] text-violet-400">
              SMARTPARK
            </p>

            <h1 className="text-4xl font-bold">
              Allocation
            </h1>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-xl bg-white/5 p-3 hover:bg-white/10"
        >
          ☰
        </button>
      </div>

      {/* Nav */}
      <nav className="mt-8 space-y-3 px-4">

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `
                flex items-center gap-4
                rounded-2xl px-4 py-4
                transition-all duration-300
                ${
                  isActive
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-300 hover:bg-white/5'
                }
              `
            }
          >

            <span className="text-2xl">
              {item.icon}
            </span>

            {!collapsed && (
              <span className="text-[16px] font-medium">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      {!collapsed && (
        <div className="absolute bottom-6 left-4 right-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5">

          <p className="text-xs tracking-[0.3em] text-slate-500">
            SYSTEM
          </p>

          <p className="mt-2 text-xl font-bold">
            Smart Parking v2.0
          </p>

          <div className="mt-4 h-2 rounded-full bg-slate-700">
            <div className="h-full w-[75%] rounded-full bg-violet-500" />
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Optimization Active
          </p>
        </div>
      )}
    </aside>
  )
}