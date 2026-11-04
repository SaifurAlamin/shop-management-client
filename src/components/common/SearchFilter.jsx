import { Search, SlidersHorizontal } from 'lucide-react'

const SearchFilter = ({
    search,
    setSearch,
    status,
    setStatus,
    statuses = ['All', 'Active', 'Inactive']
}) => (
    <div className="flex flex-wrap gap-3">
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
            <Search size={18} className="text-slate-400" />
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search records..."
                className="w-full text-sm outline-none"
            />
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
            <SlidersHorizontal size={17} className="text-slate-400" />
            <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="bg-transparent py-2.5 text-sm outline-none"
            >
                {statuses.map(item => (
                    <option key={item}>{item}</option>
                ))}
            </select>
        </div>
    </div>
)

export default SearchFilter