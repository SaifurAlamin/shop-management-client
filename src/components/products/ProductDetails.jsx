
import { Package, Tag, Boxes, Banknote } from 'lucide-react'
import Modal from '../common/Modal'
import StatusBadge from '../common/StatusBadge'

const formatPrice = value =>
    `৳ ${Number(value || 0).toLocaleString('en-BD')}`

const ProductDetails = ({ open, onClose, product }) => {
    if (!product) return null

    const stockStatus =
        Number(product.stock) === 0
            ? 'Out of Stock'
            : Number(product.stock) <= Number(product.lowStockThreshold)
                ? 'Low Stock'
                : 'In Stock'

    const details = [
        { label: 'SKU', value: product.sku, icon: Tag },
        { label: 'Category', value: product.category, icon: Boxes },
        { label: 'Purchase Price', value: formatPrice(product.costPrice), icon: Banknote },
        { label: 'Selling Price', value: formatPrice(product.price), icon: Banknote },
        { label: 'Available Stock', value: product.stock, icon: Package },
        { label: 'Low Stock Alert', value: product.lowStockThreshold, icon: Package }
    ]

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Product Details"
            size="max-w-2xl"
        >
            <div className="space-y-5">

                <div className="flex flex-col gap-4 sm:flex-row">

                    <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100 sm:w-36">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <Package size={42} className="text-slate-300" />
                        )}
                    </div>

                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800">
                            {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                            {product.sku}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <StatusBadge status={product.status} />

                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${stockStatus === 'In Stock'
                                    ? 'bg-green-50 text-green-600'
                                    : stockStatus === 'Low Stock'
                                        ? 'bg-amber-50 text-amber-600'
                                        : 'bg-red-50 text-red-600'
                                }`}>
                                {stockStatus}
                            </span>
                        </div>

                        <p className="mt-3 text-lg font-bold text-indigo-600">
                            {formatPrice(product.price)}
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {details.map(item => {
                        const Icon = item.icon

                        return (
                            <div
                                key={item.label}
                                className="rounded-lg border border-slate-100 bg-slate-50 p-3"
                            >
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Icon size={15} />
                                    {item.label}
                                </div>

                                <p className="mt-1 font-semibold text-slate-700">
                                    {item.value ?? '-'}
                                </p>
                            </div>
                        )
                    })}
                </div>

                <div>
                    <h4 className="mb-2 text-sm font-semibold text-slate-700">
                        Description
                    </h4>

                    <p className="whitespace-pre-wrap text-sm leading-6 text-slate-500">
                        {product.description || 'No description available.'}
                    </p>
                </div>

            </div>
        </Modal>
    )
}

export default ProductDetails
