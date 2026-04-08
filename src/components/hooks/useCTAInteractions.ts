import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const useCTAInteractions = () => {
  const ctaRef = useRef<HTMLButtonElement>(null);

  // Get contextSafe from useGSAP (safest way to handle event-based animations)
  const { contextSafe } = useGSAP(() => {}, {});

  // Hover In
  const onEnter = useCallback(
    contextSafe(() => {
      const button = ctaRef.current;
      if (!button) return;

      const glow = button.querySelector(".cta-glow") as HTMLElement | null;

      // Lift + scale + shadow
      gsap.to(button, {
        y: -4,
        scale: 1.03,
        duration: 0.35,
        ease: "power3.out",
        boxShadow: "0 20px 40px rgba(255,255,255,0.16)",
      });

      // Glow effect
      if (glow) {
        gsap.to(glow, {
          opacity: 1,
          scale: 1.2,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }),
    [contextSafe]
  );

  // Hover Out
  const onLeave = useCallback(
    contextSafe(() => {
      const button = ctaRef.current;
      if (!button) return;

      const glow = button.querySelector(".cta-glow") as HTMLElement | null;

      gsap.to(button, {
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
        boxShadow: "0 0 0 rgba(255,255,255,0)",
      });

      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }),
    [contextSafe]
  );

  // Mouse Down (press effect)
  const onDown = useCallback(
    contextSafe(() => {
      const button = ctaRef.current;
      if (!button) return;

      gsap.to(button, {
        scale: 0.97,
        duration: 0.15,
        ease: "power2.out",
      });
    }),
    [contextSafe]
  );

  // Mouse Up (release effect)
  const onUp = useCallback(
    contextSafe(() => {
      const button = ctaRef.current;
      if (!button) return;

      gsap.to(button, {
        scale: 1.03,
        duration: 0.2,
        ease: "power2.out",
      });
    }),
    [contextSafe]
  );

  // Attach / detach event listeners
  useGSAP(
    () => {
      const button = ctaRef.current;
      if (!button) return;

      button.addEventListener("mouseenter", onEnter);
      button.addEventListener("mouseleave", onLeave);
      button.addEventListener("mousedown", onDown);
      button.addEventListener("mouseup", onUp);

      // Cleanup on unmount or dependency change
      return () => {
        button.removeEventListener("mouseenter", onEnter);
        button.removeEventListener("mouseleave", onLeave);
        button.removeEventListener("mousedown", onDown);
        button.removeEventListener("mouseup", onUp);
      };
    },
    [onEnter, onLeave, onDown, onUp]   // Re-attach if any handler changes
  );

  return ctaRef;
};