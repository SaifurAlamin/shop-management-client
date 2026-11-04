
import { useMemo, useState } from 'react'
import { Eye, Package, AlertTriangle, Ban } from 'lucide-react'
import Swal from 'sweetalert2'

import PageHeader from '../components/common/PageHeader'
import DataTable from '../components/common/DataTable'
import Modal from '../components/common/Modal'

import ProductForm from '../components/products/ProductForm'
import ProductDetails from '../components/products/ProductDetails'
import ProductFilters from '../components/products/ProductFilters'

import { products, categories } from '../data/dummyData'

const createEmptyForm = sku => ({
    name: '',
    sku,
    category: '',
    description: '',
    costPrice: '',
    price: '',
    stock: '',
    lowStockThreshold: 5,
    status: 'Active',
    image: ''
})

const getNextSku = data => {
    const numbers = data
        .map(item => Number(item.sku?.match(/PRD-(\d+)/)?.[1] || 0))

    const nextNumber = Math.max(0, ...numbers) + 1

    return `PRD-${String(nextNumber).padStart(3, '0')}`
}

const getStockStatus = product => {
    const stock = Number(product.stock)
    const threshold = Number(product.lowStockThreshold ?? 5)

    if (stock === 0) return 'Out of Stock'
    if (stock <= threshold) return 'Low Stock'

    return 'In Stock'
}

const formatCurrency = value =>
    `৳ ${Number(value || 0).toLocaleString('en-BD')}`

const ProductManagementPage = () => {
    const [data, setData] = useState(() =>
        products.map(item => ({
            ...item,
            image: item.image || '',
            description: item.description || '',
            costPrice: item.costPrice ?? 0,
            lowStockThreshold: item.lowStockThreshold ?? 5
        }))
    )

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')
    const [status, setStatus] = useState('All')
    const [stockStatus, setStockStatus] = useState('All')

    const [formOpen, setFormOpen] = useState(false)
    const [detailsOpen, setDetailsOpen] = useState(false)

    const [editing, setEditing] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [form, setForm] = useState(createEmptyForm(getNextSku(data)))

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const searchMatch = [
                item.name,
                item.sku,
                item.category
            ].some(value =>
                String(value || '').toLowerCase().includes(search.toLowerCase())
            )

            const categoryMatch =
                category === 'All' || item.category === category

            const statusMatch =
                status === 'All' || item.status === status

            const stockMatch =
                stockStatus === 'All' || getStockStatus(item) === stockStatus

            return searchMatch && categoryMatch && statusMatch && stockMatch
        })
    }, [data, search, category, status, stockStatus])

    const openForm = (product = null) => {
        setEditing(product)

        setForm(
            product
                ? { ...product }
                : createEmptyForm(getNextSku(data))
        )

        setFormOpen(true)
    }

    const closeForm = () => {
        setFormOpen(false)
        setEditing(null)
        setForm(createEmptyForm(getNextSku(data)))
    }

    const handleChange = e => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = file => {
        if (!file) {
            setForm(prev => ({ ...prev, image: '' }))
            return
        }

        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ]

        if (!allowedTypes.includes(file.type)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid image format',
                text: 'Please upload JPG, PNG or WEBP image.'
            })
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            Swal.fire({
                icon: 'error',
                title: 'Image too large',
                text: 'Maximum image size is 2 MB.'
            })
            return
        }

        const reader = new FileReader()

        reader.onload = () => {
            setForm(prev => ({
                ...prev,
                image: reader.result
            }))
        }

        reader.readAsDataURL(file)
    }

    const handleSubmit = e => {
        e.preventDefault()

        const name = form.name.trim()
        const sku = form.sku.trim()

        const costPrice = Number(form.costPrice)
        const price = Number(form.price)
        const stock = Number(form.stock)
        const threshold = Number(form.lowStockThreshold)

        if (!name || !sku || !form.category) {
            Swal.fire({
                icon: 'warning',
                title: 'Required fields missing',
                text: 'Please fill in all required fields.'
            })
            return
        }

        if (
            !Number.isFinite(costPrice) ||
            !Number.isFinite(price) ||
            costPrice < 0 ||
            price <= 0
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid pricing',
                text: 'Purchase price cannot be negative and selling price must be greater than zero.'
            })
            return
        }

        if (
            !Number.isInteger(stock) ||
            stock < 0 ||
            !Number.isInteger(threshold) ||
            threshold < 0
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid stock quantity',
                text: 'Stock and low stock threshold must be non-negative whole numbers.'
            })
            return
        }

        if (price < costPrice) {
            Swal.fire({
                icon: 'warning',
                title: 'Selling price is lower',
                text: 'Selling price is below purchase price. Please confirm your pricing.'
            }).then(result => {
                if (result.isConfirmed) saveProduct({
                    ...form,
                    name,
                    sku,
                    costPrice,
                    price,
                    stock,
                    lowStockThreshold: threshold
                })
            })

            return
        }

        saveProduct({
            ...form,
            name,
            sku,
            costPrice,
            price,
            stock,
            lowStockThreshold: threshold
        })
    }

    const saveProduct = product => {
        if (editing) {
            setData(prev =>
                prev.map(item =>
                    item.id === editing.id
                        ? { ...item, ...product }
                        : item
                )
            )

            Swal.fire({
                icon: 'success',
                title: 'Product updated successfully',
                timer: 1200,
                showConfirmButton: false
            })
        } else {
            const newProduct = {
                ...product,
                id: Math.max(0, ...data.map(item => Number(item.id) || 0)) + 1
            }

            setData(prev => [newProduct, ...prev])

            Swal.fire({
                icon: 'success',
                title: 'Product added successfully',
                timer: 1200,
                showConfirmButton: false
            })
        }

        closeForm()
    }

    const handleDelete = async product => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Delete ${product.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            confirmButtonText: 'Yes, delete it'
        })

        if (result.isConfirmed) {
            setData(prev =>
                prev.filter(item => item.id !== product.id)
            )

            Swal.fire({
                icon: 'success',
                title: 'Product deleted successfully',
                timer: 1200,
                showConfirmButton: false
            })
        }
    }

    const handleDetails = product => {
        setSelectedProduct(product)
        setDetailsOpen(true)
    }

    const exportCSV = () => {
        const columns = [
            ['Product Name', 'name'],
            ['SKU', 'sku'],
            ['Category', 'category'],
            ['Purchase Price', 'costPrice'],
            ['Selling Price', 'price'],
            ['Stock', 'stock'],
            ['Low Stock Alert', 'lowStockThreshold'],
            ['Status', 'status']
        ]

        const escapeCSV = value =>
            `"${String(value ?? '').replace(/"/g, '""')}"`

        const csv = [
            columns.map(([label]) => escapeCSV(label)).join(','),
            ...filteredData.map(row =>
                columns.map(([, key]) => escapeCSV(row[key])).join(',')
            )
        ].join('\n')

        const blob = new Blob(
            ['\uFEFF' + csv],
            { type: 'text/csv;charset=utf-8;' }
        )

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = url
        link.download = 'products.csv'
        link.click()

        URL.revokeObjectURL(url)
    }

    const lowStockCount = data.filter(
        item => getStockStatus(item) === 'Low Stock'
    ).length

    const outOfStockCount = data.filter(
        item => getStockStatus(item) === 'Out of Stock'
    ).length

    const columns = [
        {
            key: 'image',
            label: 'Image',
            render: value => (
                <div className="h-10 w-10 overflow-hidden rounded-lg bg-slate-100">
                    {value ? (
                        <img
                            src={value}
                            alt="Product"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <Package size={18} className="text-slate-300" />
                        </div>
                    )}
                </div>
            )
        },
        {
            key: 'name',
            label: 'Product Name',
            render: (value, row) => (
                <div>
                    <p className="font-semibold text-slate-700">
                        {value}
                    </p>
                    <p className="text-xs text-slate-400">
                        {row.sku}
                    </p>
                </div>
            )
        },
        {
            key: 'category',
            label: 'Category'
        },
        {
            key: 'price',
            label: 'Selling Price',
            render: value => (
                <span className="font-medium text-slate-700">
                    {formatCurrency(value)}
                </span>
            )
        },
        {
            key: 'stock',
            label: 'Stock',
            render: (value, row) => {
                const stock = getStockStatus(row)

                return (
                    <div>
                        <p className="font-medium text-slate-700">
                            {Number(value).toLocaleString('en-BD')}
                        </p>

                        <span className={`text-xs font-medium ${stock === 'In Stock'
                                ? 'text-green-600'
                                : stock === 'Low Stock'
                                    ? 'text-amber-600'
                                    : 'text-red-500'
                            }`}>
                            {stock}
                        </span>
                    </div>
                )
            }
        },
        {
            key: 'status',
            label: 'Status'
        },
        {
            key: 'details',
            label: 'Details',
            render: (_, row) => (
                <button
                    type="button"
                    onClick={() => handleDetails(row)}
                    className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
                >
                    <Eye size={15} />
                    View
                </button>
            )
        }
    ]

    return (
        <div className="space-y-6">

            <PageHeader
                title="Products"
                description="Manage your products, pricing and inventory."
                action="Add Product"
                onAction={() => openForm()}
                showExport
                onExport={exportCSV}
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Total Products
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                {data.length}
                            </h3>
                        </div>

                        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                            <Package size={22} />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Low Stock
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-amber-600">
                                {lowStockCount}
                            </h3>
                        </div>

                        <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                            <AlertTriangle size={22} />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Out of Stock
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-red-600">
                                {outOfStockCount}
                            </h3>
                        </div>

                        <div className="rounded-xl bg-red-50 p-3 text-red-600">
                            <Ban size={22} />
                        </div>
                    </div>
                </div>

            </div>

            {/* Filters */}
            <ProductFilters
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                status={status}
                setStatus={setStatus}
                stockStatus={stockStatus}
                setStockStatus={setStockStatus}
                categories={categories}
            />

            {/* Table */}
            <DataTable
                key={`${search}-${category}-${status}-${stockStatus}`}
                columns={columns}
                data={filteredData}
                onEdit={openForm}
                onDelete={handleDelete}
                emptyMessage="No products found. Try changing your filters."
            />

            {/* Add / Edit Modal */}
            <Modal
                open={formOpen}
                onClose={closeForm}
                title={`${editing ? 'Edit' : 'Add'} Product`}
                size="max-w-3xl"
            >
                <ProductForm
                    form={form}
                    onChange={handleChange}
                    onImageChange={handleImageChange}
                    onSubmit={handleSubmit}
                    onCancel={closeForm}
                    editing={Boolean(editing)}
                    categories={categories.filter(item => item.status === 'Active')}
                />
            </Modal>

            {/* Details Modal */}
            <ProductDetails
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
                product={selectedProduct}
            />

        </div>
    )
}

export default ProductManagementPage
