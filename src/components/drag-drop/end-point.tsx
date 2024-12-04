import { Children, cloneElement, ReactNode, useEffect, useState } from 'react';import { Data, useDragndropContext } from '@/components/drag-drop/context';type Rect = {    x: number;    y: number;    width: number;    height: number;};export const DragndropEndPoint = (    {        children,        onDrop,    }: {        children: ReactNode;        onDrop?: (data: Data) => void;    }) => {    const { dropPos, data } = useDragndropContext();    const [rect, setRect] = useState<Rect>();    useEffect(() => {        if (!dropPos || !rect || !onDrop || !data) return;        const x2 = rect.x + rect.width;        const y2 = rect.y + rect.height;        if (            dropPos.x >= rect.x &&            dropPos.x <= x2 &&            dropPos.y >= rect.y &&            dropPos.y <= y2        ) {            onDrop(data);        }    }, [dropPos]);    const newChildren = Children.map(children, (child: any) =>        cloneElement(child, {            onLayout: (evt: any) => {                evt.target.measure(                    (                        _x: number,                        _y: number,                        width: number,                        height: number,                        pageX: number,                        pageY: number,                    ) => {                        setRect({ x: pageX, y: pageY, width, height });                    },                );            },        }),    );    return newChildren;};