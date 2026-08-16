import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {

    const id = useId()

    return (
        <div className="w-full">

            {label && (
                <label
                    className="inline-block mb-2 text-sm font-medium text-gray-300"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                className={`
                    px-4 py-3
                    rounded-lg
                    bg-gray-800
                    text-white
                    placeholder:text-gray-500
                    outline-none
                    border border-gray-700
                    focus:border-gray-500
                    focus:ring-1 focus:ring-gray-500
                    duration-200
                    w-full
                    ${className}
                `}
                ref={ref}
                {...props}
                id={id}
            />

        </div>
    )
})

export default Input