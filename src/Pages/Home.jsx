import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Momentum from "../assets/momentum-logo-text.png";

const Home = ({ onSwitch }) => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const logoRef = useRef(null);
  const ctaRef = useRef(null);
  const borderRef = useRef(null);
  const glowRef = useRef(null);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(elementsRef.current, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(elementsRef.current, {
        y: 60,
        opacity: 0,
        filter: "blur(10px)",
      });

      // Staggered entrance – clear hierarchy
      tl.to(elementsRef.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.6,
        stagger: 0.14,
      });

      // Gentle floating logo
      gsap.to(logoRef.current, {
        y: -22,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Spinning border
      gsap.to(borderRef.current, {
        rotation: 360,
        duration: 6,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  const handleMouseMove = (e) => {
    if (!ctaRef.current || !glowRef.current) return;
        const bounds = ctaRef.current.getBoundingClientRect();
    const x = (e.clientX - (bounds.left + bounds.width / 2)) * 0.15;
    const y = (e.clientY - (bounds.top + bounds.height / 2)) * 0.15;

    gsap.to(ctaRef.current, { x, y, duration: 0.8, ease: "power3.out" });
    gsap.to(glowRef.current, { scale: 1.35, opacity: 0.75, duration: 0.5 });
  };
  
  const handleMouseLeave = () => {
    if (!ctaRef.current || !glowRef.current) return;
    gsap.to(ctaRef.current, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.4)" });
    gsap.to(glowRef.current, { scale: 1, opacity: 0.55, duration: 0.6 });
  };

  return (
    <main
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#f8fafc]"
    >
      {/* Ambient background glows – subtle depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full bg-blue-400/10 blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-175 h-175 rounded-full bg-cyan-300/15 blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-indigo-200/20 blur-[120px]" />
      </div>

      <section className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        
        {/* Subtitle – subtle but clear */}
        <p
          ref={addToRefs}
          className="mb-8 text-sm uppercase tracking-[0.5em] text-slate-500 font-medium"
        >
          YOUR JOURNEY STARTS HERE
        </p>

        {/* Logo Container – strongest visual hierarchy */}
        <div
          ref={addToRefs}
          className="relative flex items-center justify-center w-70 md:w-105 lg:w-130 aspect-square mb-10"
        >
          {/* Large faint watermark */}
          <h1 className="absolute select-none pointer-events-none text-[110px] md:text-[160px] lg:text-[210px] font-black uppercase tracking-[-0.08em] text-black/[0.035]">
            MOMENTUM
          </h1>

          {/* Logo */}
          <img
            ref={logoRef}
            src={Momentum}
            alt="Momentum"
            draggable="false"
            className="relative z-10 w-60 md:w-85 lg:w-105 drop-shadow-2xl"
          />
        </div>

        {/* Description – excellent readability */}
        <p
          ref={addToRefs}
          className="max-w-2xl text-lg leading-relaxed text-slate-600 font-medium px-4"
        >
          A visual productivity planner that turns your goals, streaks, and monthly progress into a climb you can actually see.
        </p>

        {/* CTA – clear primary action with generous whitespace */}
        <div ref={addToRefs} className="mt-20">
          <button
            ref={ctaRef}
            onClick={onSwitch}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative overflow-hidden rounded-3xl p-px focus:outline-none active:scale-[0.985] transition-transform"
          >
            {/* Spinning conic border */}
            <span
              ref={borderRef}
              className="absolute inset-0 rounded-3xl bg-[conic-gradient(from_0deg,#3b82f6_0deg,#67e8f9_120deg,#3b82f6_240deg,transparent_360deg)]"
            />

            {/* Button body */}
            <span className="relative block rounded-[22px] bg-linear-to-br from-slate-900 via-zinc-900 to-black px-14 py-7 border border-white/10 shadow-2xl backdrop-blur-xl">
              <span className="relative z-10 text-xl font-semibold tracking-wide text-white">
                Start Your Climb
              </span>

              {/* Inner glow */}
              <span
                ref={glowRef}
                className="absolute inset-0 bg-linear-to-r from-cyan-400/40 to-blue-400/30 blur-2xl opacity-60 transition-opacity"
              />
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;