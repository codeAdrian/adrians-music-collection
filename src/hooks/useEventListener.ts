import { useEffect } from 'react';

export const useEventListener = (
    target: Document | Window | HTMLElement,
    type: string,
    listener: EventListenerOrEventListenerObject,
    ...rest: any
) => {
    useEffect(() => {
        target.addEventListener(type, listener, ...rest);
        return () => {
            target.removeEventListener(type, listener, ...rest);
        };
    }, [target, listener, type, rest]);
};
