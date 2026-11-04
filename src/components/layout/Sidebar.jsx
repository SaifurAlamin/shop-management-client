import { Link, NavLink } from 'react-router-dom'
import { Store, ChevronLeft, X } from 'lucide-react'
import { menuGroups } from '../../data/menu'

const Sidebar = ({ mobileOpen,
    setMobileOpen,
    collapsed,
    setCollapsed }) => {

    return (
        <>
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white
        transition-all duration-300
        ${collapsed ? 'w-20' : 'w-[260px]'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
                <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-5">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-indigo-600 p-2.5 text-white">
                            <Store size={21} />
                        </div>

                        {!collapsed && (
                            <Link to="/" className="block cursor-pointer group">
                                <div>
                                    <h2 className="whitespace-nowrap font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                                        Shop<span className="text-indigo-600">Manager</span>
                                    </h2>
                                    <p className="text-[9px] tracking-widest text-slate-400">
                                        MANAGEMENT SYSTEM
                                    </p>
                                </div>
                            </Link>
                        )}
                    </div>

                    <button onClick={() => setMobileOpen(false)} className="lg:hidden">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-6">
                    {menuGroups.map(group => (
                        <div key={group.title}>
                            {!collapsed && (
                                <p className="mb-3 px-3 text-[10px] font-bold tracking-widest text-slate-400">
                                    {group.title}
                                </p>
                            )}

                            <div className="space-y-1">
                                {group.items.map(({ name, path, icon: Icon }) => (
                                    <NavLink
                                        key={path}
                                        to={path}
                                        end={path === '/'}
                                        title={collapsed ? name : undefined}
                                        onClick={() => setMobileOpen(false)}
                                        className={({ isActive }) => `
                      flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium
                      transition-colors
                      ${collapsed ? 'justify-center' : ''}
                      ${isActive
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}
                    `}
                                    >
                                        <Icon size={19} />
                                        {!collapsed && name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="hidden border-t border-slate-100 p-3 lg:block">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm text-slate-500 hover:bg-slate-50"
                    >
                        <ChevronLeft
                            size={18}
                            className={collapsed ? 'rotate-180' : ''}
                        />
                        {!collapsed && 'Collapse Sidebar'}
                    </button>
                </div>

                {!collapsed && (
                    <p className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
                        ShopManager by Aysha
                    </p>
                )}
            </aside>

            <div className={`hidden lg:block ${collapsed ? 'w-20' : 'w-[260px]'}`} />
        </>
    )
}

export default Sidebar