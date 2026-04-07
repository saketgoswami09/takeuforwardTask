import { useEffect, useRef } from "react";
import gsap from "gsap";

const Preloader = ({ loaderRef }) => {
  const textRef = useRef(null);
  const glassRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = textRef.current.querySelectorAll(".letter");

      gsap.to(bgRef.current, {
        scale: 1.08,
        x: -20,
        y: -10,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(glassRef.current, {
        y: -8,
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
    <div ref={loaderRef} className="fixed inset-0 z-[999] bg-amber-500  overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center scale-105"
        
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex h-full items-center justify-center">
        <div
          ref={glassRef}
          className="rounded-[32px] border border-white/20 bg-white/10 px-10 py-8 backdrop-blur-2xl"
        >
          <div
            ref={textRef}
            className="flex overflow-hidden text-6xl font-black uppercase tracking-[0.25em] text-white"
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