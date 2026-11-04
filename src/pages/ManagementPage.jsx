import { useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import PageHeader from '../components/common/PageHeader'
import SearchFilter from '../components/common/SearchFilter'
import DataTable from '../components/common/DataTable'
import Modal from '../components/common/Modal'
import FormInput from '../components/common/FormInput'
import { filterData, generateId } from '../utils/helpers'
import { formatCurrency, formatDate } from '../utils/formatters'

const ManagementPage = ({ config }) => {
    const [data, setData] = useState(config.data)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('All')
    const [open, setOpen] = useState(false)
    const [editing, setEditing] = useState(null)

    const initialForm = Object.fromEntries(
        config.fields.map(field => [field.name, ''])
    )

    const [form, setForm] = useState(initialForm)

    const filteredData = useMemo(() => {
        let result = filterData(data, search, config.searchFields)

        if (status !== 'All' && config.statusFilter) {
            result = result.filter(item =>
                item[config.statusFilter] === status
            )
        }

        return result
    }, [data, search, status, config])

    const openModal = (row = null) => {
        setEditing(row)
        setForm(row ? { ...row } : { ...initialForm })
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
        setEditing(null)
        setForm(initialForm)
    }

    const handleChange = e => {
        const { name, value, type, checked } = e.target

        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (editing) {
            setData(prev => prev.map(item =>
                item.id === editing.id
                    ? { ...item, ...form }
                    : item
            ))

            Swal.fire({
                icon: 'success',
                title: 'Updated successfully',
                timer: 1200,
                showConfirmButton: false
            })
        } else {
            setData(prev => [
                { ...form, id: generateId(config.idPrefix) },
                ...prev
            ])

            Swal.fire({
                icon: 'success',
                title: 'Added successfully',
                timer: 1200,
                showConfirmButton: false
            })
        }

        closeModal()
    }

    const handleDelete = async row => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Delete ${row[config.nameField] || config.title}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            confirmButtonText: 'Yes, delete it'
        })

        if (result.isConfirmed) {
            setData(prev => prev.filter(item => item.id !== row.id))

            Swal.fire({
                icon: 'success',
                title: 'Deleted successfully',
                timer: 1200,
                showConfirmButton: false
            })
        }
    }
    const columns = config.columns.map(column => ({
        ...column,
        render: column.render || (
            column.type === 'currency'
                ? value => `৳ ${Number(value || 0).toLocaleString('en-BD')}`
                : column.type === 'date'
                    ? value => value ? formatDate(value) : '-'
                    : column.type === 'number'
                        ? value => Number(value || 0).toLocaleString('en-BD')
                        : undefined
        )
    }))

    const statuses = config.statusFilter
        ? ['All', ...new Set(data.map(item => item[config.statusFilter]).filter(Boolean))]
        : ['All']

    return (
        <div className="space-y-6">

            <PageHeader
                title={config.title}
                description={config.description}
                action={config.actionLabel || `Add ${config.singular}`}
                onAction={() => openModal()}
                showExport
                onExport={() => {
                    const csv = [
                        config.columns.map(col => col.label).join(','),
                        ...filteredData.map(row =>
                            config.columns.map(col =>
                                JSON.stringify(row[col.key] ?? '')
                            ).join(',')
                        )
                    ].join('\n')

                    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
                    const url = URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `${config.key}.csv`
                    link.click()
                    URL.revokeObjectURL(url)
                }}
            />

            <SearchFilter
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                statuses={statuses}
            />

            <DataTable
                columns={columns}
                data={filteredData}
                onEdit={openModal}
                onDelete={handleDelete}
            />

            <Modal
                open={open}
                onClose={closeModal}
                title={`${editing ? 'Edit' : 'Add'} ${config.singular}`}
            >
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {config.fields.map(field => (
                            <FormInput
                                key={field.name}
                                {...field}
                                value={form[field.name] ?? ''}
                                onChange={handleChange}
                            />
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                            {editing ? 'Update' : 'Save'}
                        </button>
                    </div>

                </form>
            </Modal>

        </div>
    )
}

export default ManagementPage