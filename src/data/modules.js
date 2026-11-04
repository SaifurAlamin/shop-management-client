import {
    products,
    categories,
    customers,
    orders,
    suppliers,
    purchases,
    expenses
} from './dummyData'

const commonStatus = {
    name: 'status',
    label: 'Status',
    options: ['Active', 'Inactive']
}

export const modules = {
    products: {
        key: 'products',
        idPrefix: 'PRD',
        title: 'Products',
        singular: 'Product',
        description: 'Manage your shop products and pricing.',
        data: products,
        nameField: 'name',
        searchFields: ['name', 'sku', 'category'],
        statusFilter: 'status',
        columns: [
            { key: 'name', label: 'Product Name' },
            { key: 'sku', label: 'SKU' },
            { key: 'category', label: 'Category' },
            { key: 'price', label: 'Price', type: 'currency' },
            { key: 'stock', label: 'Stock', type: 'number' },
            { key: 'status', label: 'Status' }
        ],
        fields: [
            { name: 'name', label: 'Product Name', required: true },
            { name: 'sku', label: 'SKU', required: true },
            { name: 'category', label: 'Category', options: ['Electronics', 'Fashion', 'Furniture', 'Accessories', 'Home'], required: true },
            { name: 'price', label: 'Price', type: 'number', required: true },
            { name: 'stock', label: 'Stock Quantity', type: 'number', required: true },
            commonStatus
        ]
    },

    categories: {
        key: 'categories',
        idPrefix: 'CAT',
        title: 'Categories',
        singular: 'Category',
        description: 'Organize and manage product categories.',
        data: categories,
        nameField: 'name',
        searchFields: ['name', 'description'],
        statusFilter: 'status',
        columns: [
            { key: 'name', label: 'Category Name' },
            { key: 'description', label: 'Description' },
            { key: 'products', label: 'Products', type: 'number' },
            { key: 'status', label: 'Status' }
        ],
        fields: [
            { name: 'name', label: 'Category Name', required: true },
            { name: 'description', label: 'Description', required: true },
            { name: 'products', label: 'Product Count', type: 'number' },
            commonStatus
        ]
    },

    orders: {
        key: 'orders',
        idPrefix: 'ORD',
        title: 'Orders',
        singular: 'Order',
        description: 'Track and manage customer orders.',
        data: orders,
        nameField: 'orderNo',
        searchFields: ['orderNo', 'customer'],
        statusFilter: 'status',
        columns: [
            { key: 'orderNo', label: 'Order ID' },
            { key: 'customer', label: 'Customer' },
            { key: 'date', label: 'Order Date', type: 'date' },
            { key: 'amount', label: 'Amount', type: 'currency' },
            { key: 'payment', label: 'Payment' },
            { key: 'status', label: 'Order Status' }
        ],
        fields: [
            { name: 'orderNo', label: 'Order Number', required: true },
            { name: 'customer', label: 'Customer Name', required: true },
            { name: 'date', label: 'Order Date', type: 'date', required: true },
            { name: 'amount', label: 'Amount', type: 'number', required: true },
            { name: 'payment', label: 'Payment Status', options: ['Paid', 'Unpaid', 'Pending'] },
            { name: 'status', label: 'Order Status', options: ['Pending', 'Processing', 'Delivered', 'Cancelled'] }
        ]
    },

    customers: {
        key: 'customers',
        idPrefix: 'CUS',
        title: 'Customers',
        singular: 'Customer',
        description: 'Manage your shop customers.',
        data: customers,
        nameField: 'name',
        searchFields: ['name', 'email', 'phone'],
        statusFilter: 'status',
        columns: [
            { key: 'name', label: 'Customer' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'orders', label: 'Orders', type: 'number' },
            { key: 'totalSpent', label: 'Total Spent', type: 'currency' },
            { key: 'status', label: 'Status' }
        ],
        fields: [
            { name: 'name', label: 'Customer Name', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'phone', label: 'Phone', required: true },
            { name: 'orders', label: 'Total Orders', type: 'number' },
            { name: 'totalSpent', label: 'Total Spent', type: 'number' },
            commonStatus
        ]
    },

    suppliers: {
        key: 'suppliers',
        idPrefix: 'SUP',
        title: 'Suppliers',
        singular: 'Supplier',
        description: 'Manage supplier information.',
        data: suppliers,
        nameField: 'name',
        searchFields: ['name', 'phone', 'email'],
        statusFilter: 'status',
        columns: [
            { key: 'name', label: 'Supplier Name' },
            { key: 'phone', label: 'Phone' },
            { key: 'email', label: 'Email' },
            { key: 'products', label: 'Products', type: 'number' },
            { key: 'status', label: 'Status' }
        ],
        fields: [
            { name: 'name', label: 'Supplier Name', required: true },
            { name: 'phone', label: 'Phone', required: true },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'products', label: 'Product Count', type: 'number' },
            commonStatus
        ]
    },

    purchases: {
        key: 'purchases',
        idPrefix: 'PUR',
        title: 'Purchases',
        singular: 'Purchase',
        description: 'Manage supplier purchases.',
        data: purchases,
        nameField: 'purchaseNo',
        searchFields: ['purchaseNo', 'supplier'],
        statusFilter: 'status',
        columns: [
            { key: 'purchaseNo', label: 'Purchase ID' },
            { key: 'supplier', label: 'Supplier' },
            { key: 'date', label: 'Date', type: 'date' },
            { key: 'amount', label: 'Amount', type: 'currency' },
            { key: 'status', label: 'Status' }
        ],
        fields: [
            { name: 'purchaseNo', label: 'Purchase Number', required: true },
            { name: 'supplier', label: 'Supplier', options: suppliers.map(s => s.name), required: true },
            { name: 'date', label: 'Purchase Date', type: 'date', required: true },
            { name: 'amount', label: 'Amount', type: 'number', required: true },
            { name: 'status', label: 'Status', options: ['Pending', 'Completed', 'Cancelled'] }
        ]
    },

    expenses: {
        key: 'expenses',
        idPrefix: 'EXP',
        title: 'Expenses',
        singular: 'Expense',
        description: 'Track and manage shop expenses.',
        data: expenses,
        nameField: 'title',
        searchFields: ['title', 'category'],
        statusFilter: 'status',
        columns: [
            { key: 'title', label: 'Expense Name' },
            { key: 'category', label: 'Category' },
            { key: 'date', label: 'Date', type: 'date' },
            { key: 'amount', label: 'Amount', type: 'currency' },
            { key: 'status', label: 'Payment Status' }
        ],
        fields: [
            { name: 'title', label: 'Expense Name', required: true },
            { name: 'category', label: 'Category', options: ['Rent', 'Utilities', 'Transport', 'Salary', 'Other'], required: true },
            { name: 'date', label: 'Date', type: 'date', required: true },
            { name: 'amount', label: 'Amount', type: 'number', required: true },
            { name: 'status', label: 'Payment Status', options: ['Paid', 'Pending'] }
        ]
    }
}