import React from 'react';
import { SiGithub, SiInstagram, SiLinkedin, SiGmail } from 'react-icons/si';

const socialLinks = [
  { icon: SiLinkedin, href: 'https://www.linkedin.com/in/fadhillah-ramadhan-4a3b89245/', label: 'LinkedIn' },
  { icon: SiInstagram, href: 'https://www.instagram.com/fadhillahrmdhn/', label: 'Instagram' },
  { icon: SiGmail, href: 'mailto:fadhillahrmdhn2001@gmail.com', label: 'Gmail' },
  { icon: SiGithub, href: 'https://github.com/fadhillahrmdhn', label: 'GitHub' },
];

export const Footer = () => {
  return (
    <footer className="bg-black py-10 w-full">
      <div className="flex w-full flex-col items-center justify-center gap-4 px-4">
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-slate-400 transition-colors hover:text-cyan-400">
              <social.icon className="size-6" />
            </a>
          ))}
        </div>
        <div className="text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Fadhillah Ramadhan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
