
import { Search, SlidersHorizontal, X } from 'lucide-react'

const ProductFilters = ({
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    stockStatus,
    setStockStatus,
    categories
}) => {
    const hasFilters =
        search ||
        category !== 'All' ||
        status !== 'All' ||
        stockStatus !== 'All'

    const resetFilters = () => {
        setSearch('')
        setCategory('All')
        setStatus('All')
        setStockStatus('All')
    }

    const selectClass =
        'rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500'

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">

                <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
                    <Search size={18} className="text-slate-400" />

                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by product name or SKU..."
                        className="w-full text-sm outline-none"
                    />
                </div>

                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className={selectClass}
                >
                    <option value="All">All Categories</option>

                    {categories.map(item => (
                        <option key={item.id} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className={selectClass}
                >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>

                <select
                    value={stockStatus}
                    onChange={e => setStockStatus(e.target.value)}
                    className={selectClass}
                >
                    <option value="All">All Stock</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>

                {hasFilters && (
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
                    >
                        <X size={16} />
                        Clear
                    </button>
                )}

            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <SlidersHorizontal size={14} />
                Filter products by category, status and stock availability.
            </div>
        </div>
    )
}

export default ProductFilters
