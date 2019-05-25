import React, { useCallback } from 'react';
import { ListProps } from 'models';

const List: React.FC<ListProps> = ({ array, listClass, keys, title }) => {
    const processArray = useCallback(() => {
        if (!keys) {
            return array.map((element, index) => (
                <li
                    className={`list__element list__element--${listClass}`}
                    key={`${listClass}-${index}`}
                >
                    {element}
                </li>
            ));
        }

        return array.map((element: any, index: number) => {
            let _element = {};
            _element = keys.map((key: string, index: number) => {
                if (!element[key]) {
                    return null;
                }
                return (
                    <li
                        key={`${listClass}-${key}-${index}`}
                        className={`list__element list__element--inline list__element--${key}`}
                    >
                        {element[key]}
                    </li>
                );
            });
            return (
                <li
                    className='list__element list__element--wrapper'
                    key={`${listClass}-${index}`}
                >
                    <ul
                        className={`list list--inline list--reset list--${listClass}`}
                    >
                        {_element}
                    </ul>
                </li>
            );
        });
    }, [array, listClass, keys]);

    if (array.length === 0) {
        return null;
    }

    const processedArray = processArray();

    return (
        <div className={`listWrapper listWrapper--${listClass}`}>
            <small className='small small--default'>{title}</small>
            <ul className='list--reset'>{processedArray}</ul>
        </div>
    );
};

export { List };
