import { useCallback, useRef, useState } from 'react';
import { useEventListener } from 'hooks';

export const useToggle = () => {
    const elementRef = useRef<HTMLInputElement>(null);
    const [expanded, setExpanded] = useState(false);

    const collapseIfOutside = useCallback(({ target }) => {
        const current = elementRef && elementRef.current;
        if (current && !current.contains(target)) {
            setExpanded(false);
        }
    }, []);

    useEventListener(document, 'mousedown', collapseIfOutside);

    return {
        elementRef,
        expanded,
        setExpanded
    };
};
