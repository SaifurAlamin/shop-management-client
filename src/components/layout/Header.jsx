
import { Bell, ChevronDown, Menu, Search, User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../auth/AuthContext'

const Header = ({ setMobileOpen }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Logout?',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Logout',
            cancelButtonText: 'Cancel'
        })

        if (result.isConfirmed) {
            logout()
            navigate('/login', { replace: true })
        }
    }

    return (
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">

            <div className="flex items-center gap-4">

                <button
                    onClick={() => setMobileOpen(true)}
                    className="text-slate-600 lg:hidden"
                >
                    <Menu size={23} />
                </button>

                <div className="hidden w-72 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
                    <Search size={17} className="text-slate-400" />

                    <input
                        placeholder="Search anything..."
                        className="w-full bg-transparent text-sm outline-none"
                    />
                </div>

            </div>

            <div className="flex items-center gap-4">

                <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                    <Bell size={20} />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </button>

                <div className="group relative">

                    <button className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <User size={19} />
                        </div>

                        <div className="hidden text-left sm:block">
                            <p className="text-sm font-semibold text-slate-700">
                                {user?.name || 'Admin User'}
                            </p>

                            <p className="text-xs text-slate-400">
                                {user?.role || 'Admin'}
                            </p>
                        </div>

                        <ChevronDown
                            size={16}
                            className="hidden text-slate-400 sm:block"
                        />

                    </button>

                    <div className="invisible absolute right-0 top-full mt-3 w-48 rounded-xl border border-slate-100 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">

                        <div className="border-b border-slate-100 px-3 py-2">
                            <p className="truncate text-xs font-medium text-slate-700">
                                {user?.email}
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 hover:bg-red-50"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </header>
    )
}

export default Header
