import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {

    const id = useId()

    return (
        <div className="w-full">

            {label && (
                <label
                    htmlFor={id}
                    className="inline-block mb-2 text-sm font-medium text-gray-300"
                >
                    {label}
                </label>
            )}

            <select
                {...props}
                id={id}
                ref={ref}
                className={`
                    px-4 py-3
                    rounded-lg
                    bg-gray-800
                    text-white
                    outline-none
                    border border-gray-700
                    focus:border-gray-500
                    focus:ring-1 focus:ring-gray-500
                    duration-200
                    w-full
                    cursor-pointer
                    ${className}
                `}
            >
                {options?.map((option) => (
                    <option
                        key={option}
                        value={option}
                        className="bg-gray-800 text-white"
                    >
                        {option}
                    </option>
                ))}
            </select>

        </div>
    )
})

export default Select