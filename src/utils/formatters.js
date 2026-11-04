export const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
        maximumFractionDigits: 0
    }).format(amount || 0)

export const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })

export const formatNumber = (number) =>
    new Intl.NumberFormat('en-BD').format(number || 0)

export const getInitials = (name = '') =>
    name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()