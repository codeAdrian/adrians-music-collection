import React from 'react';
import { useToggle } from 'hooks';

interface ToggleProps {
    children: any;
}

const Toggle = ({ children }: ToggleProps) => {
    const { elementRef, expanded, setExpanded } = useToggle();
    const className = expanded
        ? 'toggle__content toggle__content--visible'
        : 'toggle__content toggle__content--hidden';

    return (
        <div ref={elementRef}>
            <button onClick={handleToggle}>Toggle</button>
            <div className={className}>{children}</div>
        </div>
    );

    function handleToggle() {
        setExpanded(!expanded);
    }
};

export { Toggle };
