import { useEffect } from 'react'
import { X } from 'lucide-react'

const Modal = ({ open, onClose, title, children, size = 'max-w-lg' }) => {
    useEffect(() => {
        if (!open) return

        const handleEscape = e => {
            if (e.key === 'Escape') onClose()
        }

        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [open, onClose])

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4"
            onMouseDown={e => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div className={`max-h-[90vh] w-full ${size} overflow-y-auto rounded-xl bg-white shadow-2xl`}>
                <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
                    <h2 className="font-bold text-slate-800">{title}</h2>
                    <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-5">{children}</div>
            </div>
        </div>
    )
}

export default Modal