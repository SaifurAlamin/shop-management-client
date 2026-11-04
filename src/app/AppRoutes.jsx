
import { Routes, Route } from 'react-router-dom'

import MainLayout from '../components/layout/MainLayout'
import Dashboard from '../pages/Dashboard'
import ManagementPage from '../pages/ManagementPage'
import ProductManagementPage from '../pages/ProductManagementPage'
import Login from '../pages/Login'
import ProtectedRoute from '../auth/ProtectedRoute'

import { modules } from '../data/modules'
import PageHeader from '../components/common/PageHeader'

const PlaceholderPage = ({ title, description }) => (
    <PageHeader
        title={title}
        description={description}
    />
)

const AppRoutes = () => (
    <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>

                <Route index element={<Dashboard />} />

                <Route
                    path="products"
                    element={<ProductManagementPage />}
                />

                {Object.entries(modules)
                    .filter(([path]) => path !== 'products')
                    .map(([path, config]) => (
                        <Route
                            key={path}
                            path={path}
                            element={<ManagementPage config={config} />}
                        />
                    ))}

                <Route
                    path="sales"
                    element={
                        <PlaceholderPage
                            title="Sales"
                            description="Manage your shop sales."
                        />
                    }
                />

                <Route
                    path="reports"
                    element={
                        <PlaceholderPage
                            title="Reports"
                            description="View your shop reports."
                        />
                    }
                />

                <Route
                    path="settings"
                    element={
                        <PlaceholderPage
                            title="Settings"
                            description="Manage application settings."
                        />
                    }
                />

                <Route
                    path="*"
                    element={
                        <PlaceholderPage
                            title="404 - Not Found"
                            description="The requested page was not found."
                        />
                    }
                />

            </Route>
        </Route>

    </Routes>
)

export default AppRoutes
