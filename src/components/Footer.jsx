import React from 'react';
import { SplitVLogo } from './SplitVLogo';
import { brand } from '../config/brand';
import { Shield, Truck, RotateCcw, MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-bg-raised border-t border-line-subtle text-text-secondary">
      {/* Showroom Trust Pillars */}
      <div className="border-b border-line-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <span className="p-2.5 rounded bg-bg-surface border border-line-subtle text-accent shrink-0">
              <Shield className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold mb-1">
                Verified Engineering Data
              </h4>
              <p className="text-xs text-text-tertiary leading-relaxed">
                Zero marketing hyperbole. Every specification is cross-checked against lab measurements.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="p-2.5 rounded bg-bg-surface border border-line-subtle text-accent shrink-0">
              <Truck className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold mb-1">
                Insured White-Glove Delivery
              </h4>
              <p className="text-xs text-text-tertiary leading-relaxed">
                Temperature-monitored, sealed express transit to all major metropolitan zones across India.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="p-2.5 rounded bg-bg-surface border border-line-subtle text-accent shrink-0">
              <RotateCcw className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold mb-1">
                Concierge Hardware Service
              </h4>
              <p className="text-xs text-text-tertiary leading-relaxed">
                Direct warranty processing and dedicated tech concierge support for all showroom purchases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Showroom Address */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand & Manifesto (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-start gap-4">
          <SplitVLogo variant="horizontal" markSize={32} showTagline={true} />
          <p className="text-xs text-text-tertiary font-sans leading-relaxed max-w-sm mt-2">
            A premium technology showroom for discovering, comparing and purchasing thoughtfully selected hardware. Built for craft, silence, and longevity.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary mt-2">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>Showroom: {brand.contact.location}</span>
          </div>
        </div>

        {/* Categories (3 cols) */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-mono uppercase tracking-eyebrow text-text-primary font-semibold mb-4">
            Showroom Categories
          </h4>
          <ul className="space-y-2 text-xs font-sans">
            <li>
              <a href="#catalogue" className="hover:text-accent transition-colors">
                Laptops & Workstations
              </a>
            </li>
            <li>
              <a href="#catalogue" className="hover:text-accent transition-colors">
                Audio & Acoustics
              </a>
            </li>
            <li>
              <a href="#catalogue" className="hover:text-accent transition-colors">
                Displays & Vision
              </a>
            </li>
            <li>
              <a href="#catalogue" className="hover:text-accent transition-colors">
                Mechanical & Peripherals
              </a>
            </li>
          </ul>
        </div>

        {/* Concierge & Legal (4 cols) */}
        <div className="md:col-span-4">
          <h4 className="text-xs font-mono uppercase tracking-eyebrow text-text-primary font-semibold mb-4">
            Showroom Concierge
          </h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-accent" />
              <a href={`mailto:${brand.contact.email}`} className="hover:text-text-primary">
                {brand.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>{brand.contact.phone}</span>
            </div>
          </div>
          <p className="text-[11px] text-text-tertiary mt-4 leading-relaxed font-sans">
            All prices listed in Indian Rupees (₹) inclusive of applicable taxes. Vantry is a registered trademark.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-line-subtle py-6 bg-bg-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-text-tertiary">
          <span>© {new Date().getFullYear()} VANTRY Technologies India. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-text-primary">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-text-primary">Terms of Showroom</span>
            <span>·</span>
            <span className="hover:text-text-primary">Warranty Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
