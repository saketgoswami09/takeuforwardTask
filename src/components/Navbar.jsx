import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const MenuIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/calendar", label: "Calendar" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/50 backdrop-blur-xl">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Momentum Logo"
            draggable="false"
            className="h-8 sm:h-10 w-auto max-w-[140px] sm:max-w-none object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
          />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-2 sm:gap-3 md:gap-6">
          <div className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500/10 text-slate-800 shadow-sm"
                      : "text-slate-500 hover:bg-white/40 hover:text-slate-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-5 sm:w-6 -translate-x-1/2 rounded-full bg-blue-500" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-1 sm:mx-2 h-4 w-px bg-slate-300" />

          {/* GitHub */}
          <a
            href="https://github.com/saketgoswami09/takeuforwardTask.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md text-slate-500 transition-all duration-300 hover:bg-white/40 hover:text-slate-800"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden flex items-center justify-center h-10 w-10 rounded-lg text-slate-600 hover:bg-white/40 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <CloseIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-white/20 bg-white/80 backdrop-blur-xl animate-[slideDown_0.2s_ease-out]">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-500/10 text-slate-800"
                      : "text-slate-500 hover:bg-white/40 hover:text-slate-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            
            {/* Mobile GitHub link */}
            <a
              href="https://github.com/saketgoswami09/takeuforwardTask.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 hover:bg-white/40 hover:text-slate-800 transition-all"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
