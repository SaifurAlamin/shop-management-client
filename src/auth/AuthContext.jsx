
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'shop_manager_user'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem(STORAGE_KEY)
            return savedUser ? JSON.parse(savedUser) : null
        } catch {
            localStorage.removeItem(STORAGE_KEY)
            return null
        }
    })


    const demoUsers = [
        {
            id: 1,
            name: 'Admin User',
            email: 'admin@shopmanager.com',
            password: '123456',
            role: 'Super Admin'
        },
        {
            id: 2,
            name: 'Aysha',
            email: 'aysha@shopmanager.com',
            password: 'aysha123',
            role: 'Manager'
        },
        {
            id: 3,
            name: 'Karim Hasan',
            email: 'karim@shopmanager.com',
            password: 'karim123',
            role: 'Sales Manager'
        },
        {
            id: 4,
            name: 'Nusrat Jahan',
            email: 'nusrat@shopmanager.com',
            password: 'nusrat123',
            role: 'Inventory Manager'
        }
    ]

    const login = (email, password) => {
        const matchedUser = demoUsers.find(user =>
            user.email.toLowerCase() === email.trim().toLowerCase() &&
            user.password === password
        )

        if (!matchedUser) {
            return {
                success: false,
                message: 'Invalid email or password.'
            }
        }

        // Never store the demo password in the session.
        const { password: _, ...userData } = matchedUser

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(userData)
        )

        setUser(userData)

        return { success: true }
    }

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider')
    }

    return context
}
