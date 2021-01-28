import React from 'react'
import './Button.scss'

const Button = ({value,type,...restProps}) => {

    return(
        <input 
            type={type} 
            className="customButton" 
            value={value} 
            {...restProps}
        />
    )
}

export default Button