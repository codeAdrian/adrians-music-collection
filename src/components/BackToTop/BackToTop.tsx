import React, { useState, useEffect, useCallback } from 'react';

const BackToTop: React.FunctionComponent = () => {
    const [triggerValue, setTriggerValue] = useState<number>(500);
    const [isActive, setIsActive] = useState<boolean>(false);

    const updateTriggerValue = () => {
        setTriggerValue(window.outerHeight);
    };

    const handleScroll = useCallback(() => {
        setIsActive(window.pageYOffset > triggerValue);
    }, [triggerValue]);

    const scrollUp = () => {
        const doc: HTMLElement = document.documentElement;
        const top: number =
            (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

        if (top > 0) {
            window.scrollTo(0, top - 50);
            setTimeout(scrollUp, 1);
        }
    };

    useEffect(() => {
        updateTriggerValue();
        document.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateTriggerValue);

        return function cleanup() {
            document.removeEventListener('scroll', handleScroll);
            document.removeEventListener('resize', updateTriggerValue);
        };
    }, [handleScroll]);

    const activeClassName: 'active' | '' = isActive ? 'active' : '';

    return (
        <button
            onClick={scrollUp}
            className={`button button--top ${activeClassName}`}
        >
            BACK TO TOP
            <i className='button-icon fas fa-arrow-up' />
        </button>
    );
};

export default BackToTop;
