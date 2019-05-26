import { FieldRenderPropsMeta } from 'react-define-form/lib/FieldProps';

export interface InputProps {
    meta: FieldRenderPropsMeta<any>;
    label: string;
    required?: boolean;
    type?: string;
    hideLabel?: boolean;
    className?: string;
}
