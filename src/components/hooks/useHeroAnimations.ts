import React, { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";   // ← Recommended by GSAP team

// Register plugins once (ideally in a separate lib/gsap.ts file)
gsap.registerPlugin(ScrollTrigger);

// ====================== Custom Hooks ======================

/**
 * Hero animations hook (entrance + parallax + spinning border)
 */
export const useHeroAnimations = (prefersReducedMotion: boolean) => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".hero-fade", { opacity: 1, y: 0 });
        return;
      }

      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-frame", {
        scale: 0.92,
        opacity: 0,
        duration: 1.4,
      })
        .from(
          ".title-word",
          { yPercent: 120, duration: 1 },
          "-=0.9"
        )
        .from(
          ".hero-fade",
          {
            opacity: 0,
            y: 30,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.7"
        );

      // Parallax on background
      if (videoWrapperRef.current) {
        gsap.to(videoWrapperRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-frame",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Continuous spinning border
      gsap.to(".cta-border", {
        rotate: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });
    },
    { dependencies: [prefersReducedMotion] }   // Re-run when reduced motion changes
  );

  return { videoWrapperRef };
};

/**
 * CTA button hover / press interactions
 */
export const useCTAInteractions = () => {
  const ctaRef = useRef<HTMLButtonElement>(null);

  // Use contextSafe to make event handlers "context-safe"
  const { contextSafe } = useGSAP(() => {
    // This runs once and gives us contextSafe
  }, {});

  const onEnter = useCallback(
    contextSafe(() => {
      const button = ctaRef.current;
      if (!button) return;

      const glow = button.querySelector(".cta-glow") as HTMLElement | null;

      gsap.to(button, {
        y: -4,
        scale: 1.03,
        duration: 0.35,
        ease: "power3.out",
        boxShadow: "0 20px 40px rgba(255,255,255,0.16)",
      });

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
        });
      }
    }),
    [contextSafe]
  );

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

  // Attach event listeners
  useGSAP(
    () => {
      const button = ctaRef.current;
      if (!button) return;

      button.addEventListener("mouseenter", onEnter);
      button.addEventListener("mouseleave", onLeave);
      button.addEventListener("mousedown", onDown);
      button.addEventListener("mouseup", onUp);

      return () => {
        button.removeEventListener("mouseenter", onEnter);
        button.removeEventListener("mouseleave", onLeave);
        button.removeEventListener("mousedown", onDown);
        button.removeEventListener("mouseup", onUp);
      };
    },
    [onEnter, onLeave, onDown, onUp]
  );

  return ctaRef;
};