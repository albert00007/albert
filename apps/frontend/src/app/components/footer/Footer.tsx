import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandVisa,
  IconBrandMastercard,
  IconBrandStripe,
  IconBrandPaypal,
  IconBrandApple,
} from "@tabler/icons-react";

const footerLinks = {
  resources: [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#service" },
    { label: "Portfolio", href: "/#portfolio" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  social: [
    {
      label: "Twitter",
      href: "https://twitter.com/microstatedev",
      icon: IconBrandTwitter,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/microstatedev",
      icon: IconBrandInstagram,
    },
    {
      label: "Github",
      href: "https://github.com/microstatedev",
      icon: IconBrandGithub,
    },
    {
      label: "Youtube",
      href: "https://youtube.com/microstatedev",
      icon: IconBrandYoutube,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest/30 backdrop-blur-md border-t border-outline/30 mt-32">
      <div className="max-w-[1200px] px-6 py-16 mx-auto md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-2xl text-white font-extrabold tracking-tight">MicroState<span className="text-brand-cyan">Dev</span></p>
            <p className="text-on-surface-variant text-sm mt-3 leading-relaxed">
              Precision execution, clean architecture, and scalable infrastructure. Engineering the future of digital products.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <p className="font-semibold text-white tracking-wide uppercase text-sm">Resources</p>
              <nav className="flex flex-col mt-6 space-y-3 text-sm text-on-surface-variant">
                {footerLinks.resources.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <p className="font-semibold text-white tracking-wide uppercase text-sm">Legal</p>
              <nav className="flex flex-col mt-6 space-y-3 text-sm text-on-surface-variant">
                {footerLinks.legal.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <p className="font-semibold text-white tracking-wide uppercase text-sm">Newsletter</p>
            <p className="text-on-surface-variant text-sm mt-3 mb-4">Insights on tech and architecture.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2.5 text-sm text-white bg-surface-container-high border border-outline/50 rounded-l-lg focus:outline-none focus:border-brand-cyan transition-colors"
              />
              <button className="px-4 py-2.5 text-sm font-bold text-brand-blue bg-brand-cyan rounded-r-lg hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-12 border-t border-outline/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-on-surface-variant">
            <IconBrandVisa size={32} stroke={1} className="hover:text-white transition-colors" />
            <IconBrandMastercard size={32} stroke={1} className="hover:text-white transition-colors" />
            <IconBrandStripe size={32} stroke={1} className="hover:text-white transition-colors" />
            <IconBrandPaypal size={32} stroke={1} className="hover:text-white transition-colors" />
            <IconBrandApple size={32} stroke={1} className="hover:text-white transition-colors" />
          </div>
          
          <p className="text-sm text-on-surface-variant">
            &copy; {new Date().getFullYear()} MicroStateDev. All rights reserved.
          </p>
          
          <div className="flex space-x-5">
            {footerLinks.social.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-on-surface-variant hover:text-brand-cyan transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{link.label}</span>
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
