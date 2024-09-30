import { useEffect, useState } from "react";

export default function useViewportWidth() {

    const [width, setWidth] = useState<number>(0);

    const setViewportWidth = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {

        if (width === 0) setViewportWidth();

        window.addEventListener('resize', setViewportWidth);
        return () => {
            window.removeEventListener('DOMContentLoaded', setViewportWidth);
            window.removeEventListener('resize', setViewportWidth);
        };
    }, []);

    return width;

}