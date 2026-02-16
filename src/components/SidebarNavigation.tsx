import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Home, FolderKanban, Tv, BarChart3, Gamepad2, ArrowDown } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'Home', icon: Home, href: '#hero' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, href: '#projects', color: '#E74C3C' },
  { id: 'anime-stats', label: 'Anime Stats', icon: Tv, href: '#anime-stats' },
  { id: 'tier-list', label: 'Tier List', icon: BarChart3, href: '#tier-list' },
  { id: 'gaming-library', label: 'Gaming', icon: Gamepad2, href: '#gaming-library' },
  { id: 'footer', label: 'Bottom', icon: ArrowDown, href: '#footer', color: '#3BA55D' },
];

export default function SidebarNavigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetSectionRef = useRef<string | null>(null);

  const detectActiveSection = useCallback(() => {
    const viewportCenter = window.innerHeight / 2;
    let closestSection = SECTIONS[0].id;
    let closestDistance = Infinity;
    for (const section of SECTIONS) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section.id;
          }
        }
      }
    }
    
    return closestSection;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll.current && targetSectionRef.current) {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
          targetSectionRef.current = null;
          setActiveSection(detectActiveSection());
        }, 200);
        
        return;
      }

      setActiveSection(detectActiveSection());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [detectActiveSection]);

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
      isProgrammaticScroll.current = true;
      targetSectionRef.current = targetId;
      setActiveSection(targetId);
      
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-40">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        const accentColor = section.color || '#5865F2';
        
        return (
          <div key={section.id} className="relative group">
            {/* Tooltip */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              <div className="px-3 py-1.5 rounded-lg bg-[#1E2028] border border-white/10 text-sm font-medium text-white shadow-lg">
                {section.label}
              </div>
            </div>
            
            {/* Dot indicator */}
            <motion.button
              onClick={() => scrollToSection(section.href)}
              className="w-3 h-3 rounded-full"
              initial={false}
              animate={{
                backgroundColor: isActive ? accentColor : 'rgba(255, 255, 255, 0.2)',
                boxShadow: isActive ? `0 0 12px ${accentColor}66` : '0 0 0px transparent',
                scale: isActive ? 1.25 : 1,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              whileHover={{ scale: 1.3, backgroundColor: isActive ? accentColor : 'rgba(255, 255, 255, 0.4)' }}
              whileTap={{ scale: 0.9 }}
              aria-label={section.label}
            />
            
            {/* Active indicator line */}
            {isActive && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                className="absolute left-0 top-1/2 -translate-y-1/2 h-px"
                style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
