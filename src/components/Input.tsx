import React from 'react';
import { InputProps } from 'models';

const Input: React.FC<InputProps> = ({
    label,
    meta,
    hideLabel,
    className,
    ...rest
}) => (
    <div className='input'>
        <label className={hideLabel ? 'hidden' : 'input__label'}>{label}</label>
        <div className={`${className ? className : 'input__wrapper'}`}>
            <input className='input__element' {...rest} />
        </div>
        {!hideLabel && meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
);

export { Input };
