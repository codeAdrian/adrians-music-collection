import React from 'react';
import { InputProps } from 'models';

const Input: React.FC<InputProps> = ({ label, meta, ...rest }) => (
    <div>
        <label>{label}</label>
        <input {...rest} />
        {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
);

export { Input };
