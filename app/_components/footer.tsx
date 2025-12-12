import { SiGithub, SiInstagram, SiLinkedin, SiGmail } from 'react-icons/si';

const socialLinks = [
  { icon: SiLinkedin, href: 'https://www.linkedin.com/in/fadhillah-ramadhan-4a3b89245/', label: 'LinkedIn' },
  { icon: SiInstagram, href: 'https://www.instagram.com/fadhillahrmdhn/', label: 'Instagram' },
  { icon: SiGmail, href: 'mailto:fadhillahrmdhn2001@gmail.com', label: 'Gmail' },
  { icon: SiGithub, href: 'https://github.com/fadhillahrmdhn', label: 'GitHub' },
];

export const Footer = () => {
  return (
    <footer className="bg-primary/10 py-5  w-full absolute -bottom-1/4">
      <div className="flex w-full flex-col-reverse md:flex-row items-center justify-between gap-4 px-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Fadhillah Ramadhan. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-muted-foreground transition-colors hover:text-primary">
              <social.icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
