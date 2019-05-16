import React, { useCallback } from 'react';
interface ListProps {
    array: any[];
    listClass: string;
    keys?: string[];
    title: string;
}

const List = ({ array, listClass, keys, title }: ListProps): JSX.Element => {
    const processArray = useCallback(() => {
        let elements;

        if (keys) {
            elements = array.map((element: string, index: number) => {
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
        } else {
            elements = array.map((element, index) => (
                <li key={`${listClass}-${index}`}>{element}</li>
            ));
        }

        return elements;
    }, [array, listClass, keys]);

    const processedArray = processArray();

    if (array.length === 0) {
        return <div />;
    }

    return (
        <div>
            <small>{title}</small>
            <ul className={listClass + ' processedList'}>{processedArray}</ul>
        </div>
    );
};

export default List;
