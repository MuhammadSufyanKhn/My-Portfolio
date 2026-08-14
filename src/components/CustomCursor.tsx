import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorVariant, setCursorVariant] = useState("default");
  const pos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.transform = `translate(-50%, -50%)`;
    };

    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.15;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.15;
      follower.style.left = `${followerPos.current.x}px`;
      follower.style.top = `${followerPos.current.y}px`;
      follower.style.transform = `translate(-50%, -50%)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterButton = () => setCursorVariant("button");
    const onLeaveButton = () => setCursorVariant("default");
    const onEnterCard = () => setCursorVariant("card");
    const onLeaveCard = () => setCursorVariant("default");

    const attachListeners = () => {
      document.querySelectorAll("button, a, [data-cursor='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnterButton);
        el.addEventListener("mouseleave", onLeaveButton);
      });
      document.querySelectorAll("[data-cursor='card']").forEach((el) => {
        el.addEventListener("mouseenter", onEnterCard);
        el.addEventListener("mouseleave", onLeaveCard);
      });
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    attachListeners();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  const cursorStyles = {
    default: { width: "8px", height: "8px", background: "rgba(56, 189, 248, 0.9)", boxShadow: "0 0 12px rgba(56, 189, 248, 0.6)" },
    button: { width: "36px", height: "36px", background: "rgba(56, 189, 248, 0.12)", border: "1.5px solid rgba(56, 189, 248, 0.6)", boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" },
    card: { width: "48px", height: "48px", background: "rgba(16, 185, 129, 0.08)", border: "1.5px solid rgba(16, 185, 129, 0.4)", boxShadow: "0 0 25px rgba(16, 185, 129, 0.2)" },
  };

  const style = cursorStyles[cursorVariant as keyof typeof cursorStyles] || cursorStyles.default;

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 1000002,
          borderRadius: "50%",
          transition: "width 0.25s ease, height 0.25s ease, background 0.25s ease, border 0.25s ease",
          ...style,
        }}
      />
      <div
        ref={followerRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 1000001,
          width: cursorVariant === "card" ? "64px" : cursorVariant === "button" ? "44px" : "28px",
          height: cursorVariant === "card" ? "64px" : cursorVariant === "button" ? "44px" : "28px",
          borderRadius: "50%",
          border: cursorVariant === "default" ? "1px solid rgba(56, 189, 248, 0.25)" : "none",
          background: "transparent",
          transition: "width 0.3s ease, height 0.3s ease",
        }}
      />
    </>
  );
}
