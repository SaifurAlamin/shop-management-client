export const products = [
    { id: 1, name: 'Wireless Headphone', sku: 'PRD-001', category: 'Electronics', price: 2500, stock: 35, status: 'Active' },
    { id: 2, name: 'Smart Watch', sku: 'PRD-002', category: 'Electronics', price: 4200, stock: 12, status: 'Active' },
    { id: 3, name: 'Cotton T-Shirt', sku: 'PRD-003', category: 'Fashion', price: 650, stock: 80, status: 'Active' },
    { id: 4, name: 'Running Shoes', sku: 'PRD-004', category: 'Fashion', price: 3200, stock: 5, status: 'Active' },
    { id: 5, name: 'Office Chair', sku: 'PRD-005', category: 'Furniture', price: 7500, stock: 0, status: 'Inactive' },
    { id: 6, name: 'Bluetooth Speaker', sku: 'PRD-006', category: 'Electronics', price: 1800, stock: 22, status: 'Active' },
    { id: 7, name: 'Travel Backpack', sku: 'PRD-007', category: 'Accessories', price: 1500, stock: 18, status: 'Active' },
    { id: 8, name: 'Desk Lamp', sku: 'PRD-008', category: 'Home', price: 950, stock: 3, status: 'Active' }
]

export const categories = [
    { id: 1, name: 'Electronics', description: 'Electronic devices', products: 3, status: 'Active' },
    { id: 2, name: 'Fashion', description: 'Clothing and footwear', products: 2, status: 'Active' },
    { id: 3, name: 'Furniture', description: 'Home and office furniture', products: 1, status: 'Active' },
    { id: 4, name: 'Accessories', description: 'Fashion accessories', products: 1, status: 'Active' },
    { id: 5, name: 'Home', description: 'Home essentials', products: 1, status: 'Active' }
]

export const customers = [
    { id: 1, name: 'Rahim Ahmed', email: 'rahim@gmail.com', phone: '01712345678', orders: 12, totalSpent: 18500, status: 'Active' },
    { id: 2, name: 'Karim Hasan', email: 'karim@gmail.com', phone: '01812345678', orders: 8, totalSpent: 12000, status: 'Active' },
    { id: 3, name: 'Nusrat Jahan', email: 'nusrat@gmail.com', phone: '01912345678', orders: 15, totalSpent: 24500, status: 'Active' },
    { id: 4, name: 'Sakib Hossain', email: 'sakib@gmail.com', phone: '01612345678', orders: 3, totalSpent: 4500, status: 'Inactive' }
]

export const orders = [
    { id: 1, orderNo: 'ORD-1025', customer: 'Rahim Ahmed', date: '2026-11-04', amount: 2500, payment: 'Paid', status: 'Delivered' },
    { id: 2, orderNo: 'ORD-1024', customer: 'Karim Hasan', date: '2026-11-04', amount: 1850, payment: 'Pending', status: 'Processing' },
    { id: 3, orderNo: 'ORD-1023', customer: 'Nusrat Jahan', date: '2026-11-03', amount: 4200, payment: 'Unpaid', status: 'Pending' },
    { id: 4, orderNo: 'ORD-1022', customer: 'Sakib Hossain', date: '2026-11-03', amount: 950, payment: 'Paid', status: 'Delivered' },
    { id: 5, orderNo: 'ORD-1021', customer: 'Tanvir Islam', date: '2026-11-02', amount: 3100, payment: 'Paid', status: 'Cancelled' }
]

export const suppliers = [
    { id: 1, name: 'Tech Distribution BD', phone: '01711111111', email: 'tech@example.com', products: 15, status: 'Active' },
    { id: 2, name: 'Fashion Wholesale', phone: '01822222222', email: 'fashion@example.com', products: 25, status: 'Active' },
    { id: 3, name: 'Home Essentials Ltd', phone: '01933333333', email: 'home@example.com', products: 12, status: 'Active' }
]

export const purchases = [
    { id: 1, purchaseNo: 'PUR-001', supplier: 'Tech Distribution BD', date: '2026-11-01', amount: 25000, status: 'Completed' },
    { id: 2, purchaseNo: 'PUR-002', supplier: 'Fashion Wholesale', date: '2026-11-02', amount: 18000, status: 'Pending' }
]

export const expenses = [
    { id: 1, title: 'Shop Rent', category: 'Rent', date: '2026-11-01', amount: 15000, status: 'Paid' },
    { id: 2, title: 'Electricity Bill', category: 'Utilities', date: '2026-11-02', amount: 2500, status: 'Paid' },
    { id: 3, title: 'Delivery Cost', category: 'Transport', date: '2026-11-03', amount: 1200, status: 'Pending' }
]