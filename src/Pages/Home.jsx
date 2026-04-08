import React from "react";
import { useReducedMotion } from "../components/hooks/useReducedMotion";
import { useHeroAnimations } from "../components/hooks/useHeroAnimations";
import { useCTAInteractions } from "../components/hooks/useCTAInteractions";

const Home = () => {
  // Get reduced motion preference
  const prefersReducedMotion = useReducedMotion();

  // Animation hooks
  const { videoWrapperRef } = useHeroAnimations(prefersReducedMotion);
  const ctaRef = useCTAInteractions();

  return (
    <main className="relative overflow-hidden">
      <section className="hero-frame relative min-h-screen">
        {/* Background with Parallax */}
        <div
          ref={videoWrapperRef}
          className="absolute inset-0 overflow-hidden bg-cover bg-center will-change-transform"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2017/03/07/14/19/mountain-climbing-2124113_1280.jpg')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
          {/* Subtitle */}
          <p className="hero-fade mb-4 text-sm uppercase tracking-[0.4em]">
            YOUR JOURNEY STARTS HERE
          </p>

          {/* Main Title */}
          <h1 className="overflow-hidden text-6xl font-black uppercase md:text-8xl">
            <span className="title-word inline-block text-white">
              Momen
              <span className="bg-gradient-to-t to-cyan-200 bg-clip-text text-transparent">
                tum
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="hero-fade mt-6 max-w-2xl text-lg text-white/80">
            A visual calendar built for ambitious minds to organize goals, track
            streaks, and keep moving forward.
          </p>

          {/* CTA Button with Animated Border */}
          <button
            ref={ctaRef}
            className="cta-btn relative z-20 hero-fade mt-10 overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            {/* Spinning Border */}
            <span className="cta-border absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,255,255,0.8)_50%,transparent_100%)]" />

            {/* Button Body */}
            <span className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600/40 via-indigo-900/60 to-blue-500/40 px-8 py-4 backdrop-blur-2xl border border-white/20 transition-all">
              <span className="cta-text relative z-10 font-medium tracking-wide text-white">
                Start the Journey
              </span>

              {/* Glow Effect */}
              <span className="cta-glow absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 blur-xl" />
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;