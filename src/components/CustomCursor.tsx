import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);

    const addHoverListeners = useCallback((ring: HTMLDivElement) => {
        const onHover = () => ring.classList.add("cursor-hover");
        const onUnhover = () => ring.classList.remove("cursor-hover");

        const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
        interactives.forEach((el) => {
            el.addEventListener("mouseenter", onHover);
            el.addEventListener("mouseleave", onUnhover);
        });

        return () => {
            interactives.forEach((el) => {
                el.removeEventListener("mouseenter", onHover);
                el.removeEventListener("mouseleave", onUnhover);
            });
        };
    }, []);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        };

        const tick = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
            rafRef.current = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", onMove);
        rafRef.current = requestAnimationFrame(tick);

        // Initial listener binding
        let cleanupHover = addHoverListeners(ring);

        // Re-bind on DOM changes (React renders new elements)
        const observer = new MutationObserver(() => {
            cleanupHover();
            cleanupHover = addHoverListeners(ring);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafRef.current);
            cleanupHover();
            observer.disconnect();
        };
    }, [addHoverListeners]);

    // On touch devices, don't render cursor
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            <div ref={dotRef} className="cursor-dot hidden md:block" />
            <div ref={ringRef} className="cursor-ring hidden md:block" />
        </>
    );
}
