import { useEffect, useRef } from "react";
import gsap from "gsap";

const MountainGlassHero = () => {
  const bgRef = useRef(null);
  const glassRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // slow cinematic background drift
      gsap.to(bgRef.current, {
        scale: 1.08,
        x: -20,
        y: -10,
        duration: 8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      // glass floating effect
      gsap.to(glassRef.current, {
        y: -12,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('https://miro.medium.com/v2/resize:fit:720/format:webp/1*RF9dAZq1euiBbRxNPxrz8g.jpeg')",
        }}
      />

      {/* dark cinematic overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* glass card */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div
          ref={glassRef}
          className="w-full max-w-3xl rounded-32px border border-white/20 bg-white/10 p-10 shadow-2xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-white/70">
            Extreme Adventure
          </p>

          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
            Climb Beyond
            <br />
            The Horizon
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/80">
            Crafted for explorers who move through storms, ice, and impossible
            terrain.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MountainGlassHero;