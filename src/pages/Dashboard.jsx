import {
    DollarSign,
    ShoppingCart,
    Package,
    Users,
    ArrowUpRight
} from 'lucide-react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

import PageHeader from '../components/common/PageHeader'
import StatCard from '../components/common/StatCard'
import DataTable from '../components/common/DataTable'
import { orders } from '../data/dummyData'
import { formatCurrency, formatDate } from '../utils/formatters'

const stats = [
    {
        title: 'Total Revenue',
        value: '৳ 2,45,800',
        change: '+12.5%',
        icon: DollarSign,
        color: 'bg-indigo-50 text-indigo-600'
    },
    {
        title: 'Total Orders',
        value: '1,245',
        change: '+8.2%',
        icon: ShoppingCart,
        color: 'bg-blue-50 text-blue-600'
    },
    {
        title: 'Total Products',
        value: '856',
        change: '+4.3%',
        icon: Package,
        color: 'bg-amber-50 text-amber-600'
    },
    {
        title: 'Total Customers',
        value: '2,450',
        change: '-2.4%',
        positive: false,
        icon: Users,
        color: 'bg-purple-50 text-purple-600'
    }
]

const chartData = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 18000 },
    { month: 'Mar', sales: 15000 },
    { month: 'Apr', sales: 25000 },
    { month: 'May', sales: 22000 },
    { month: 'Jun', sales: 32000 },
    { month: 'Jul', sales: 28000 },
    { month: 'Aug', sales: 38000 },
    { month: 'Sep', sales: 34000 },
    { month: 'Oct', sales: 45000 },
    { month: 'Nov', sales: 42000 },
    { month: 'Dec', sales: 55000 }
]

const Dashboard = () => {
    const columns = [
        { key: 'orderNo', label: 'Order ID' },
        { key: 'customer', label: 'Customer' },
        { key: 'date', label: 'Date', render: value => formatDate(value) },
        { key: 'amount', label: 'Amount', render: value => formatCurrency(value) },
        { key: 'status', label: 'Status' }
    ]

    return (
        <div className="space-y-6">
            <PageHeader
                title="Dashboard"
                description="Welcome back! Here's what's happening with your shop today."
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(item => (
                    <StatCard key={item.title} {...item} />
                ))}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-slate-800">Sales Overview</h2>
                        <p className="mt-1 text-xs text-slate-400">Monthly revenue performance</p>
                    </div>

                    <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
                        <option>2026</option>
                        <option>2025</option>
                    </select>
                </div>

                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip formatter={value => formatCurrency(value)} />

                            <Area
                                dataKey="sales"
                                stroke="#6366f1"
                                strokeWidth={3}
                                fill="url(#salesGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-slate-800">Recent Orders</h2>
                    <p className="mt-1 text-xs text-slate-400">Latest customer transactions</p>
                </div>

                <button
                    onClick={() => window.location.assign('/orders')}
                    className="flex items-center gap-1 text-sm font-semibold text-indigo-600"
                >
                    View Orders <ArrowUpRight size={16} />
                </button>
            </div>

            <DataTable columns={columns} data={orders} />
        </div>
    )
}

export default Dashboard