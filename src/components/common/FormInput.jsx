const FormInput = ({
    label,
    name,
    value,
    onChange,
    type = 'text',
    required = false,
    placeholder,
    options,
    ...props
}) => (
    <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-600">
            {label} {required && <span className="text-red-500">*</span>}
        </label>

        {options ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                {...props}
            >
                <option value="">Select {label}</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                {...props}
            />
        )}
    </div>
)

export default FormInput