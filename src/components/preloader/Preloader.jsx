import { useEffect, useRef } from "react";
import gsap from "gsap";

const Preloader = ({ loaderRef }) => {
  const textRef = useRef(null);
  const glassRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = textRef.current.querySelectorAll(".letter");
      const isMobile = window.innerWidth < 640;

      gsap.to(bgRef.current, {
        scale: 1.08,
        x: isMobile ? -10 : -20,
        y: isMobile ? -5 : -10,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(glassRef.current, {
        y: isMobile ? -4 : -8,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.fromTo(
        letters,
        {
          yPercent: 140,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.07,
          duration: 1,
          ease: "power4.out",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[999] bg-amber-500 overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center scale-105"
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex h-full items-center justify-center px-4 sm:px-6">
        <div
          ref={glassRef}
          className="rounded-2xl sm:rounded-[32px] border border-white/20 bg-white/10 px-5 py-5 sm:px-8 sm:py-6 md:px-10 md:py-8 backdrop-blur-2xl max-w-[92vw]"
        >
          <div
            ref={textRef}
            className="flex overflow-hidden text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.25em] text-white"
          >
            {"Momentum".split("").map((char, index) => (
              <span key={index} className="letter inline-block">
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
