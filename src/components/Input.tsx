import React from 'react';
import { FieldRenderPropsMeta } from 'react-define-form/lib/FieldProps';

interface InputProps {
    meta: FieldRenderPropsMeta<any>;
    label: string;
    required?: boolean;
    type?: string;
}

const Input: React.FC<InputProps> = ({ label, meta, ...rest }) => (
    <div>
        <label>{label}</label>
        <input {...rest} />
        {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
);

export { Input };
