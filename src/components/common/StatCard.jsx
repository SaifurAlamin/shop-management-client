const StatCard = ({ title, value, change, icon: Icon, color, positive = true }) => (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                <Icon size={22} />
            </div>
            <span className={`text-xs font-semibold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
                {change}
            </span>
        </div>

        <p className="mt-5 text-sm text-slate-500">{title}</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-800">{value}</h2>
    </div>
)

export default StatCard