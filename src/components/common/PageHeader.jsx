import { Plus, Download } from 'lucide-react'

const PageHeader = ({
    title,
    description,
    action,
    onAction,
    showExport = false,
    onExport
}) => (
    <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>

        <div className="flex gap-2">
            {showExport && (
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                    <Download size={17} /> Export
                </button>
            )}

            {action && (
                <button
                    onClick={onAction}
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    <Plus size={18} /> {action}
                </button>
            )}
        </div>
    </div>
)

export default PageHeader