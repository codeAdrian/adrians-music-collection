import React, { useCallback } from 'react';
interface ListProps {
    array: any[];
    listClass: string;
    keys?: string[];
    title: string;
}

const List = ({ array, listClass, keys, title }: ListProps) => {
    const processArray = useCallback(() => {
        if (!keys) {
            return array.map((element, index) => (
                <li key={`${listClass}-${index}`}>{element}</li>
            ));
        }

        return array.map((element: string, index: number) => {
            let _element = {};
            _element = keys.map((key: string, index: number) => {
                //@ts-ignore
                if (!element[key]) {
                    return null;
                }
                return (
                    <li
                        key={`${listClass}-${key}-${index}`}
                        className={`${listClass}__${key}`}
                    >
                        {
                            //@ts-ignore
                            element[key]
                        }
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

    const processedArray = processArray();

    if (array.length === 0) {
        return null;
    }

    return (
        <div>
            <small>{title}</small>
            <ul>{processedArray}</ul>
        </div>
    );
};

export default List;
