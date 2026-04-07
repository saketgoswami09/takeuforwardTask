import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // ♿ Reduced motion
      if (prefersReducedMotion) {
        gsap.set(".hero-fade", { opacity: 1, y: 0 });
        return;
      }

      // 🎬 Hero opening sequence
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.from(".hero-frame", {
        scale: 0.92,
        opacity: 0,
        duration: 1.4,
      })
        .from(
          ".title-word",
          {
            yPercent: 120,
            duration: 1,
          },
          "-=0.9",
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
          "-=0.7",
        );

      // 🌄 Hero parallax
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

      // ✨ Premium border rotation
      gsap.to(".cta-border", {
        rotate: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // ✨ CTA micro interactions
      if (ctaRef.current) {
        const button = ctaRef.current;
        const glow = button.querySelector(".cta-glow");

        const onEnter = () => {
          gsap.to(button, {
            y: -4,
            scale: 1.03,
            duration: 0.35,
            ease: "power3.out",
            boxShadow: "0 20px 40px rgba(255,255,255,0.16)",
          });

          gsap.to(glow, {
            opacity: 1,
            scale: 1.2,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(".cta-border", {
            duration: 1.2,
          });
        };

        const onLeave = () => {
          gsap.to(button, {
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
            boxShadow: "0 0 0 rgba(255,255,255,0)",
          });

          gsap.to(glow, {
            opacity: 0,
            scale: 1,
            duration: 0.4,
          });
        };

        const onDown = () => {
          gsap.to(button, {
            scale: 0.97,
            duration: 0.15,
            ease: "power2.out",
          });
        };

        const onUp = () => {
          gsap.to(button, {
            scale: 1.03,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        button.addEventListener("mouseenter", onEnter);
        button.addEventListener("mouseleave", onLeave);
        button.addEventListener("mousedown", onDown);
        button.addEventListener("mouseup", onUp);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative overflow-hidden">
      <section className="hero-frame relative min-h-screen">
        {/* 🏔️ Background */}
        <div
          ref={videoWrapperRef}
          className="absolute inset-5 overflow-hidden rounded-3xl bg-cover bg-center will-change-transform"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2017/03/07/14/19/mountain-climbing-2124113_1280.jpg')",
          }}
        />

        {/* overlay */}
        <div className="absolute inset-2 rounded-3xl bg" />

        {/* content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
          <p className="hero-fade mb-4 text-sm uppercase tracking-[0.4em]">
            YOUR JOURNEY STARTS HERE
          </p>

          <h1 className="overflow-hidden text-6xl font-black uppercase md:text-8xl">
            <span className="title-word inline-block text-white">
              Momen
              <span className="bg-gradient-to-t  to-cyan-200 bg-clip-text text-transparent">
                tum
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-2xl text-lg text-white/80">
            A visual calendar built for ambitious minds to organize goals, track
            streaks, and keep moving forward.
          </p>

          {/* 💎 Animated border CTA */}
          <button
            ref={ctaRef}
            className="cta-btn relative z-20 hero-fade mt-10 overflow-hidden rounded-full p-[1px]"
          >
            {/* The Spinning Border: Pure white with high opacity for a "spark" effect */}
            <span className="cta-border absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,255,255,0.8)_50%,transparent_100%)]" />

            <span className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600/40 via-indigo-900/60 to-blue-500/40 px-8 py-4 backdrop-blur-2xl border border-white/20">
              <span className="cta-text relative z-10 text-white font-medium tracking-wide">
                Start the Journey
              </span>
              {/* Glow: Cyan-Blue for a "cold" energy */}
              <span className="cta-glow absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 blur-xl" />
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
