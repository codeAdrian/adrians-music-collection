import React, { useCallback } from 'react';
import { ListProps } from 'models';

const List: React.FC<ListProps> = ({ array, listClass, keys, title }) => {
    const processArray = useCallback(() => {
        if (!keys) {
            return array.map((element, index) => (
                <li key={`${listClass}-${index}`}>{element}</li>
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
                        className={`${listClass}__${key}`}
                    >
                        {element[key]}
                    </li>
                );
            });
            return (
                <li key={`${listClass}-${index}`}>
                    <ul>{_element}</ul>
                </li>
            );
        });
    }, [array, listClass, keys]);

    if (array.length === 0) {
        return null;
    }

    const processedArray = processArray();

    return (
        <div>
            <small>{title}</small>
            <ul>{processedArray}</ul>
        </div>
    );
};

export { List };
