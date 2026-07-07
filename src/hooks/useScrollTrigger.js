import { useEffect, useRef } from "react";

export default function useScrollTrigger(callback) {
  const fired = useRef(false);
  const lock = useRef(false);

  useEffect(() => {
    const trigger = () => {
      if (fired.current || lock.current) return;

      lock.current = true;
      fired.current = true;

      callback?.();
      setTimeout(() => {
        lock.current = false;
      }, 500);
    };

    let startY = 0;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > 10) trigger();
    };

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      const endY = e.changedTouches[0].clientY;

      if (Math.abs(startY - endY) > 40) trigger();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [callback]);
}