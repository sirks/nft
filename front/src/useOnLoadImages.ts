import { useState, RefObject } from "react";

export const useOnLoadImages = (ref: RefObject<HTMLElement>) => {
    const [status, setStatus] = useState<boolean>(false);

    const loadImages = () => {
        const updateStatus = (images: HTMLImageElement[]) => {
            setStatus(
                images.map((image) => image.complete).every((item) => item === true)
            );
        };

        if (!ref?.current) return;

        const imagesLoaded = Array.from(ref.current.querySelectorAll("img"));

        if (imagesLoaded.length === 0) {
            return;
        }

        imagesLoaded.forEach((image) => {
            image.addEventListener("load", () => updateStatus(imagesLoaded), {
                once: true
            });
            image.addEventListener("error", () => updateStatus(imagesLoaded), {
                once: true
            });
        });

        return;
    };

    return {
        loadImages,
        status,
        setStatus
    };
};
