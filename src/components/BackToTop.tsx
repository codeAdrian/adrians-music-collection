import React, { useState, useCallback } from 'react';
import { useEventListener } from 'hooks';

const BackToTop: React.FC = function() {
    const [triggerValue, setTriggerValue] = useState(500);
    const [isActive, setIsActive] = useState(false);

    const handleScroll = useCallback(() => {
        setIsActive(window.pageYOffset > triggerValue);
    }, [triggerValue]);

    useEventListener(document, 'scroll', handleScroll);
    useEventListener(window, 'resize', updateTriggerValue);

    const defaultClasses = 'button button--fixed backToTop deco';

    const activeClassName = isActive
        ? `${defaultClasses} backToTop--active`
        : defaultClasses;

    return (
        <button onClick={scrollToTop} className={activeClassName}>
            <span className='deco__content icon--medium fas fa-arrow-up' />
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
