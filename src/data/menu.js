import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    Users,
    Warehouse,
    Truck,
    ShoppingBag,
    Receipt,
    Wallet,
    BarChart3,
    Settings
} from 'lucide-react'

export const menuGroups = [
    {
        title: 'MAIN MENU',
        items: [
            { name: 'Dashboard', path: '/', icon: LayoutDashboard },
            { name: 'Products', path: '/products', icon: Package },
            { name: 'Categories', path: '/categories', icon: Tags },
            { name: 'Orders', path: '/orders', icon: ShoppingCart },
            { name: 'Customers', path: '/customers', icon: Users }
        ]
    },
    {
        title: 'INVENTORY & SALES',
        items: [
            { name: 'Inventory', path: '/inventory', icon: Warehouse },
            { name: 'Suppliers', path: '/suppliers', icon: Truck },
            { name: 'Purchases', path: '/purchases', icon: ShoppingBag },
            { name: 'Sales / POS', path: '/sales', icon: Receipt }
        ]
    },
    {
        title: 'MANAGEMENT',
        items: [
            { name: 'Expenses', path: '/expenses', icon: Wallet },
            { name: 'Reports', path: '/reports', icon: BarChart3 },
            { name: 'Settings', path: '/settings', icon: Settings }
        ]
    }
]