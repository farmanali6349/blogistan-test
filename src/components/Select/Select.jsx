import React, { forwardRef, useId } from 'react'
import "./Select.css"

function Select(
    {
        options = [],
        className="",
        label,
        ...props
    }, 
    ref
) {

    const id = useId();
    
  return (

    <div className="select">

        {label && (
            <label htmlFor={id}>{label}</label>
        )}

        <select 
            name="" 
            id={id}
            ref={ref}
            {...props}
            className={`${className}`

        }
            >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        
    </div>
  )
}

export default forwardRef(Select);