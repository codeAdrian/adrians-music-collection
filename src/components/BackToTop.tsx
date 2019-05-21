import React, { useState, useEffect, useCallback } from 'react';

const BackToTop: React.FC = function() {
    const [triggerValue, setTriggerValue] = useState(500);
    const [isActive, setIsActive] = useState(false);

    const handleScroll = useCallback(() => {
        setIsActive(window.pageYOffset > triggerValue);
    }, [triggerValue]);

    useEffect(() => {
        updateTriggerValue();
        document.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateTriggerValue);

        return () => {
            document.removeEventListener('scroll', handleScroll);
            document.removeEventListener('resize', updateTriggerValue);
        };
    }, [handleScroll]);

    const activeClassName: 'active' | '' = isActive ? 'active' : '';

    return (
        <button onClick={scrollToTop} className={activeClassName}>
            BACK TO TOP
        </button>
    );

    function updateTriggerValue() {
        setTriggerValue(window.outerHeight);
    }

    function scrollToTop() {
        const doc = document.documentElement;
        const top =
            (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

        if (top > 0) {
            window.scrollTo(0, top - 50);
            setTimeout(scrollToTop, 1);
        }
    }
};

export { BackToTop };
