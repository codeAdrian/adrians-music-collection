import React from 'react';
import { FieldRenderPropsMeta } from 'react-define-form/lib/FieldProps';

interface InputProps {
    meta: FieldRenderPropsMeta<any>;
    label: string;
    type?: string;
}

const Input = ({ label, meta, ...rest }: InputProps) => (
    <div>
        <label>{label}</label>
        <input {...rest} />
        {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
);

export default Input;
