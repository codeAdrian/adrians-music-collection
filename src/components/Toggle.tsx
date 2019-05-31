import React from 'react';
import { useToggle } from 'hooks';

interface ToggleProps {
    classes: {
        trigger: string;
        content: string;
        wrapper: string;
    };
    children: any;
    toggleIcon: any;
}

const Toggle = ({ children, toggleIcon, classes }: ToggleProps) => {
    const { elementRef, expanded, setExpanded } = useToggle();
    const contentDefaultClass = `toggle__content ${classes.content}`;
    const classNameContent = expanded
        ? `${contentDefaultClass} ${
              classes.content
          }--visible toggle__content--visible`
        : `${contentDefaultClass} ${
              classes.content
          }--hidden toggle__content--hidden`;

    const triggerDefaultClass = `button toggle__button ${classes.trigger}`;

    const classNameTrigger = expanded
        ? `${triggerDefaultClass} ${
              classes.trigger
          }--visible toggle__trigger--visible`
        : `${triggerDefaultClass} ${
              classes.trigger
          }--hidden toggle__trigger--hidden`;

    return (
        <div className={classes.wrapper} ref={elementRef}>
            <button className={classNameTrigger} onClick={handleToggle}>
                {toggleIcon}
            </button>
            <div className={classNameContent}>{children}</div>
        </div>
    );

    function handleToggle() {
        setExpanded(!expanded);
    }
};

export { Toggle };
