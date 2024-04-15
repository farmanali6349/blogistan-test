import React from 'react'
import { forwardRef, useId } from 'react';
import "./Input.css"
function Input (
    {
        label,
        type="text",
        placeholder = "Enter",
        className = "",
        error = null,
        ...props
    },
    ref
) {
    const id = useId();

    return (
        <div className='input-div'>
        {label && (
            <label htmlFor={id}>
                {label}
            </label>
        )}

        <input 
            type={type} 
            id={id} 
            placeholder={placeholder} 
            ref={ref}
            className={`${className}`}
            {...props}
        />
        
        {error && <p className='input-error'>{error}</p>}
        </div>
    )
}


export default forwardRef(Input);