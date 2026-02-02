import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, Gamepad2, BarChart3, X, Home, Sparkles, Github } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#', icon: Home },
  { label: 'Anime Stats', href: '#anime-stats', icon: Tv },
  { label: 'Tier List', href: '#tier-list', icon: BarChart3 },
  { label: 'Gaming', href: '#gaming-library', icon: Gamepad2 },
];

const EXTERNAL_LINKS = [
  { label: 'Steam', href: 'https://steamcommunity.com/id/Foxemss/', icon: 'steam' },
  { label: 'GitHub', href: 'https://github.com/Foxemsx', icon: 'github' },
];

function SteamIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
    </svg>
  );
}

const menuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const backdropVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const panelVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300,
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
    x: 50,
  },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center">
      <motion.span
        className="absolute w-6 h-0.5 rounded-full bg-current"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -4,
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="absolute w-6 h-0.5 rounded-full bg-current"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="absolute w-6 h-0.5 rounded-full bg-current"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 4,
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [mobileMenuOpen]);

  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    const focusableElements = menuRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!focusableElements || focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`mx-auto max-w-5xl rounded-2xl border transition-all duration-300 backdrop-blur-md ${
              isScrolled 
                ? 'bg-[var(--bg-secondary)]/90 border-[var(--border-subtle)] shadow-lg shadow-black/20' 
                : 'bg-transparent border-transparent'
            }`}
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2 group">
                <motion.div 
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E74C3C] to-[#C0392B] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#E74C3C]/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  F
                </motion.div>
                <span className="font-bold text-lg tracking-tight group-hover:text-[var(--text-primary)] transition-colors">
                  Foxems
                </span>
              </a>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <link.icon size={16} />
                    {link.label}
                  </motion.a>
                ))}
                {/* External Links */}
                <div className="flex items-center gap-1 ml-2 pl-2 border-l border-[var(--border-subtle)]">
                  {EXTERNAL_LINKS.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={link.label}
                    >
                      {link.icon === 'steam' ? <SteamIcon size={16} /> : <Github size={16} />}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Mobile Toggle */}
              <motion.button 
                ref={firstFocusableRef}
                className="md:hidden relative p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                whileTap={{ scale: 0.95 }}
              >
                <HamburgerIcon isOpen={mobileMenuOpen} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[60] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onKeyDown={handleTabKey}
          >
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              className="absolute inset-0 bg-black/80"
              onClick={handleBackdropClick}
            />

            {/* Side Panel */}
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              variants={panelVariants}
              className="absolute right-0 top-0 bottom-0 w-[280px] max-w-[85vw] bg-[var(--bg-secondary)] shadow-2xl shadow-black/50 flex flex-col z-10"
              style={{
                borderLeft: '1px solid var(--border-subtle)',
              }}
            >
              {/* Menu Header */}
              <div 
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E74C3C] to-[#C0392B] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#E74C3C]/20">
                    F
                  </div>
                  <div>
                    <h2 className="font-bold text-[var(--text-primary)]">Menu</h2>
                    <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                      <Sparkles size={10} className="text-[var(--accent-primary)]" />
                      Foxems v2.0
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-2">
                  {NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.label}
                      custom={index}
                      initial="closed"
                      animate="open"
                      variants={itemVariants}
                    >
                      <motion.a
                        ref={index === NAV_LINKS.length - 1 ? lastFocusableRef : undefined}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex items-center gap-4 p-4 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                        style={{
                          backgroundColor: 'transparent',
                        }}
                        whileHover={{
                          backgroundColor: 'var(--bg-card)',
                          x: 4,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div 
                          className="p-3 rounded-xl"
                          style={{ 
                            backgroundColor: 'var(--bg-card)',
                            color: 'var(--accent-primary)',
                          }}
                          whileHover={{
                            backgroundColor: 'var(--accent-primary)',
                            color: 'white',
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <link.icon size={22} />
                        </motion.div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-base">{link.label}</span>
                        </div>
                        <motion.div
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* External Links - Mobile */}
              <div 
                className="px-5 py-3 border-t"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <p className="text-xs text-[var(--text-muted)] mb-2 uppercase tracking-wider font-medium">Quick Access</p>
                <div className="flex gap-2">
                  {EXTERNAL_LINKS.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-200 bg-gray-800/30 hover:bg-gray-800/60 transition-all flex-1 justify-center"
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.icon === 'steam' ? <SteamIcon size={16} /> : <Github size={16} />}
                      <span>{link.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Menu Footer */}
              <div 
                className="px-5 py-4 border-t"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <p className="text-xs text-center text-[var(--text-muted)]">
                  Press <kbd className="px-2 py-1 rounded bg-[var(--bg-card)] text-[var(--text-secondary)] font-mono text-[10px]">ESC</kbd> to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}