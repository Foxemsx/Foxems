import { motion } from 'framer-motion';
import { Heart, Github, Twitter, MessageCircle, Gamepad2, BarChart3, Trophy, Layers } from 'lucide-react';
import { useProfile } from '../hooks/useApiData';

// Steam icon component
function SteamIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.267-2.266 2.267-1.253 0-2.265-1.016-2.265-2.267z"/>
    </svg>
  );
}

export default function Footer() {
  const { data: profile } = useProfile();

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Anime Statistics', href: '#anime-stats', icon: BarChart3 },
    { label: 'Top 10', href: '#top-10', icon: Trophy },
    { label: 'Tier List', href: '#tier-list', icon: Layers },
    { label: 'Gaming Stats', href: '#gaming', icon: Gamepad2 },
  ];

  return (
    <footer 
      id="footer"
      className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E74C3C] to-[#C0392B] flex items-center justify-center shadow-lg shadow-[#E74C3C]/20">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-xl text-[var(--text-primary)]">
                {profile?.displayName || 'Foxems'}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              {profile?.bio || 'Anime enthusiast, gamer, and tier list connoisseur. Building tools for the community.'}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4 text-[var(--text-primary)]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[#FF6B35] transition-colors flex items-center gap-2"
                  >
                    <link.icon size={14} className="opacity-50" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4 text-[var(--text-primary)]">
              Connect
            </h3>
            <div className="flex gap-3">
              {profile?.socials?.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF6B35]/20 flex items-center justify-center transition-all border border-white/10 hover:border-[#FF6B35]/50"
                >
                  <Github size={18} className="text-[var(--text-secondary)] hover:text-[#FF6B35] transition-colors" />
                </a>
              )}
              {profile?.socials?.twitter && (
                <a
                  href={profile.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4ECDC4]/20 flex items-center justify-center transition-all border border-white/10 hover:border-[#4ECDC4]/50"
                >
                  <Twitter size={18} className="text-[var(--text-secondary)] hover:text-[#4ECDC4] transition-colors" />
                </a>
              )}
              {profile?.socials?.discord && (
                <a
                  href={`https://discord.com/users/${profile.socials.discord}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#5865F2]/20 flex items-center justify-center transition-all border border-white/10 hover:border-[#5865F2]/50"
                >
                  <MessageCircle size={18} className="text-[var(--text-secondary)] hover:text-[#5865F2] transition-colors" />
                </a>
              )}
              {profile?.socials?.mal && (
                <a
                  href={profile.socials.mal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#2E51A2]/20 flex items-center justify-center transition-all border border-white/10 hover:border-[#2E51A2]/50"
                >
                  <span className="text-xs font-bold text-[var(--text-secondary)] hover:text-[#2E51A2] transition-colors">MAL</span>
                </a>
              )}
              <a
                href="https://steamcommunity.com/id/Foxemss/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1b2838]/40 flex items-center justify-center transition-all border border-white/10 hover:border-[#66c0f4]/50"
              >
                <SteamIcon size={18} className="text-[var(--text-secondary)] hover:text-[#66c0f4] transition-colors" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-white/10 flex items-center justify-between text-sm"
        >
          <span className="text-[var(--text-muted)] flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500" fill="#ef4444" /> by {profile?.displayName || 'Foxems'} • {currentYear}
          </span>
          <span className="text-[var(--text-muted)]">
            Powered by <a href="https://github.com/Foxems/foxcli" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition-colors">FoxCLI</a>
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
