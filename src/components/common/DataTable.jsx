import {
    ChevronLeft,
    ChevronRight,
    Pencil,
    Trash2
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { PAGE_LIMIT } from '../../utils/constants'
import { paginateData, getTotalPages } from '../../utils/helpers'
import StatusBadge from './StatusBadge'

const DataTable = ({
    columns,
    data,
    onEdit,
    onDelete,
    loading = false,
    emptyMessage = 'No records found'
}) => {
    const [page, setPage] = useState(1)

    const totalPages = getTotalPages(data.length, PAGE_LIMIT)

    const currentData = useMemo(
        () => paginateData(data, page, PAGE_LIMIT),
        [data, page]
    )

    const renderCell = (column, row) => {
        const value = row[column.key]

        if (column.render) return column.render(value, row)

        if (column.key === 'status' || column.key === 'payment') {
            return <StatusBadge status={value} />
        }

        return value ?? '-'
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                        <tr>
                            {columns.map(column => (
                                <th key={column.key} className="whitespace-nowrap px-5 py-4 font-semibold">
                                    {column.label}
                                </th>
                            ))}
                            {(onEdit || onDelete) && (
                                <th className="px-5 py-4 text-right">Actions</th>
                            )}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="py-12 text-center text-slate-400">
                                    Loading records...
                                </td>
                            </tr>
                        ) : currentData.length ? (
                            currentData.map(row => (
                                <tr key={row.id} className="hover:bg-slate-50/70">
                                    {columns.map(column => (
                                        <td key={column.key} className="whitespace-nowrap px-5 py-4 text-slate-600">
                                            {renderCell(column, row)}
                                        </td>
                                    ))}

                                    {(onEdit || onDelete) && (
                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                {onEdit && (
                                                    <button onClick={() => onEdit(row)} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50">
                                                        <Pencil size={16} />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button onClick={() => onDelete(row)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="py-12 text-center text-slate-400">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
                <p className="text-xs text-slate-500">
                    Showing {data.length ? (page - 1) * PAGE_LIMIT + 1 : 0} to {Math.min(page * PAGE_LIMIT, data.length)} of {data.length} records
                </p>

                <div className="flex items-center gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="rounded-lg border border-slate-200 p-2 disabled:opacity-40"
                    >
                        <ChevronLeft size={17} />
                    </button>

                    <span className="text-xs text-slate-600">
                        {page} / {Math.max(totalPages, 1)}
                    </span>

                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="rounded-lg border border-slate-200 p-2 disabled:opacity-40"
                    >
                        <ChevronRight size={17} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DataTable