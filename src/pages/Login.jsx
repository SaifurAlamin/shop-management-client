
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Store, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Swal from 'sweetalert2'
import { useAuth } from '../auth/AuthContext'

const Login = () => {
    const { user, login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    if (user) {
        return <Navigate to="/" replace />
    }

    const handleSubmit = async e => {
        e.preventDefault()

        setLoading(true)

        const result = login(email, password)

        setLoading(false)

        if (result.success) {
            await Swal.fire({
                icon: 'success',
                title: 'Welcome Back!',
                text: 'Login successful.',
                timer: 1000,
                showConfirmButton: false
            })

            navigate('/', { replace: true })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: result.message
            })
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">

            <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">

                {/* Left Side */}
                <div className="hidden flex-col justify-between bg-indigo-600 p-10 text-white lg:flex">

                    <div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-white/15 p-3">
                                <Store size={28} />
                            </div>

                            <h1 className="text-2xl font-bold">
                                ShopManager
                            </h1>
                        </div>

                        <div className="mt-24">
                            <h2 className="text-4xl font-bold leading-tight">
                                Manage your shop smarter.
                            </h2>

                            <p className="mt-5 max-w-sm text-sm leading-7 text-indigo-100">
                                Manage products, inventory, sales, customers
                                and your entire shop from one place.
                            </p>
                        </div>
                    </div>

                    <p className="text-xs text-indigo-200">
                        © 2026 ShopManager. All rights reserved.
                    </p>

                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">

                    <div className="w-full max-w-md">

                        <div className="mb-8 lg:hidden">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-indigo-600 p-3 text-white">
                                    <Store size={24} />
                                </div>

                                <h1 className="text-xl font-bold text-slate-800">
                                    Shop<span className="text-indigo-600">Manager</span>
                                </h1>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800">
                                Welcome Back!
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Please sign in to access your dashboard.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-600">
                                    Email Address
                                </label>

                                <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                                    <Mail size={18} className="text-slate-400" />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        autoComplete="username"
                                        className="w-full text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-600">
                                    Password
                                </label>

                                <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                                    <Lock size={18} className="text-slate-400" />

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="current-password"
                                        className="w-full text-sm outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword
                                            ? <EyeOff size={18} />
                                            : <Eye size={18} />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                                {!loading && <ArrowRight size={18} />}
                            </button>

                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                            <p className="mb-2 text-xs font-bold text-indigo-700">
                                DEMO LOGIN CREDENTIALS
                            </p>

                            <p className="text-xs text-slate-600">
                                Email: admin@shopmanager.com
                            </p>

                            <p className="mt-1 text-xs text-slate-600">
                                Password: 123456
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setEmail('admin@shopmanager.com')
                                    setPassword('123456')
                                }}
                                className="mt-3 text-xs font-semibold text-indigo-600 hover:underline"
                            >
                                Fill demo credentials
                            </button>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login
