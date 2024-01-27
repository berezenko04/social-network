'use client';

import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";


type TReactPortalProps = {
    children: React.ReactNode,
    wrapperId?: string
}

const ReactPortal: React.FC<TReactPortalProps> = ({ children, wrapperId = 'modalRoot' }) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    const createWrapperAndAppendToBody = (wrapperId: string) => {
        const wrapperElement = document.createElement('div');
        wrapperElement.setAttribute("id", wrapperId);
        document.body.appendChild(wrapperElement);
        return wrapperElement;
    }

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);

        if (!element) {
            element = createWrapperAndAppendToBody(wrapperId);
        }

        setWrapperElement(element);
    }, [wrapperId]);

    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
}

export default ReactPortal