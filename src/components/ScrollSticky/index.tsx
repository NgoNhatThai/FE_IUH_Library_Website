'use client';
import React, { useEffect } from "react";

interface ScrollStickyProps {
    parentId?: string;
    childId?: string;
    height: number;
}

const ScrollSticky = ({ parentId, childId, height }: ScrollStickyProps) => {
    const [elementWidth, setElementWidth] = React.useState<number>(0);

    const handleScroll = () => {
        setElementWidth(window.scrollY);
    }

    useEffect(() => {
        if (elementWidth >= height && childId) {
            childId && document.getElementById(childId)?.classList.add("sticky");
        } else {
            childId && document.getElementById(childId)?.classList.remove("sticky");
        }
    }, [elementWidth])

    useEffect(() => {
        const element = parentId ? document.getElementById(parentId) : window;
        (element || window).addEventListener("scroll", handleScroll, { passive: true });
    }, [])
    return null;
}

export default ScrollSticky;