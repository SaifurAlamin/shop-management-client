export const filterData = (data, search, fields = []) => {
    if (!search.trim()) return data

    const value = search.toLowerCase()

    return data.filter(item =>
        fields.some(field =>
            String(item[field] ?? '').toLowerCase().includes(value)
        )
    )
}

export const paginateData = (data, page, limit) => {
    const start = (page - 1) * limit
    return data.slice(start, start + limit)
}

export const getTotalPages = (total, limit) =>
    Math.ceil(total / limit)

export const getStatusColor = (status) => {
    const colors = {
        Active: 'emerald',
        Delivered: 'emerald',
        Paid: 'emerald',
        Completed: 'emerald',
        Pending: 'amber',
        Processing: 'blue',
        Inactive: 'slate',
        Cancelled: 'red',
        Low: 'red',
        Unpaid: 'red'
    }

    return colors[status] || 'slate'
}

export const generateId = (prefix = 'ID') =>
    `${prefix}-${Date.now().toString().slice(-6)}`