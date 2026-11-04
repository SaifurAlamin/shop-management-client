
import { useEffect, useRef } from 'react'
import { ImagePlus, X } from 'lucide-react'
import FormInput from '../common/FormInput'

const ProductForm = ({
    form,
    onChange,
    onImageChange,
    onSubmit,
    onCancel,
    editing,
    categories
}) => {
    const fileRef = useRef(null)

    useEffect(() => {
        return () => {
            // Image preview is managed by the parent component.
        }
    }, [])

    return (
        <form onSubmit={onSubmit} className="space-y-5">

            {/* Product Image */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                    Product Image
                </label>

                <div className="flex flex-wrap items-center gap-4">

                    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">

                        {form.image ? (
                            <img
                                src={form.image}
                                alt="Product preview"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="text-center text-slate-400">
                                <ImagePlus size={26} className="mx-auto" />
                                <span className="mt-1 block text-xs">
                                    No image
                                </span>
                            </div>
                        )}

                    </div>

                    <div className="space-y-2">
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Upload Image
                        </button>

                        {form.image && (
                            <button
                                type="button"
                                onClick={() => onImageChange(null)}
                                className="flex items-center gap-1 text-xs text-red-500"
                            >
                                <X size={14} />
                                Remove image
                            </button>
                        )}

                        <p className="text-xs text-slate-400">
                            JPG, PNG or WEBP. Maximum 2 MB.
                        </p>
                    </div>

                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={e => {
                            const file = e.target.files?.[0]
                            if (file) onImageChange(file)
                            e.target.value = ''
                        }}
                    />

                </div>
            </div>

            {/* Basic Information */}
            <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                    Basic Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <FormInput
                        name="name"
                        label="Product Name"
                        value={form.name}
                        onChange={onChange}
                        required
                        placeholder="Enter product name"
                    />

                    <FormInput
                        name="sku"
                        label="SKU"
                        value={form.sku}
                        onChange={onChange}
                        required
                        readOnly
                    />

                    <FormInput
                        name="category"
                        label="Category"
                        value={form.category}
                        onChange={onChange}
                        options={categories.map(item => item.name)}
                        required
                    />

                    <FormInput
                        name="status"
                        label="Status"
                        value={form.status}
                        onChange={onChange}
                        options={['Active', 'Inactive']}
                        required
                    />

                </div>

                <div className="mt-4">
                    <label className="mb-1.5 block text-sm font-medium text-slate-600">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        rows={3}
                        placeholder="Write product description..."
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                </div>
            </div>

            {/* Pricing */}
            <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                    Pricing Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <FormInput
                        name="costPrice"
                        label="Purchase Price (৳)"
                        type="number"
                        value={form.costPrice}
                        onChange={onChange}
                        required
                        min="0"
                        step="0.01"
                    />

                    <FormInput
                        name="price"
                        label="Selling Price (৳)"
                        type="number"
                        value={form.price}
                        onChange={onChange}
                        required
                        min="0.01"
                        step="0.01"
                    />

                </div>
            </div>

            {/* Inventory */}
            <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                    Inventory Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <FormInput
                        name="stock"
                        label="Stock Quantity"
                        type="number"
                        value={form.stock}
                        onChange={onChange}
                        required
                        min="0"
                        step="1"
                    />

                    <FormInput
                        name="lowStockThreshold"
                        label="Low Stock Alert Quantity"
                        type="number"
                        value={form.lowStockThreshold}
                        onChange={onChange}
                        required
                        min="0"
                        step="1"
                    />

                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    {editing ? 'Update Product' : 'Save Product'}
                </button>

            </div>

        </form>
    )
}

export default ProductForm
