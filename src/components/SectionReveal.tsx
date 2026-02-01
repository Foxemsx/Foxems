import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

export default function SectionReveal({ children, delay = 0, className = '', id }: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] // Cubic bezier for smooth easing
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
