// frontend/src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker, HiArrowRight } from 'react-icons/hi';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from 'react-icons/fa';
import Logo from '../../assets/images/wali.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com/jazeeraictgirls' },
    { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com/company/jazeeraictgirls' },
    { icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com/@jazeeraictgirls' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Community', path: '/community' },
    { name: 'Blog', path: '/blog' },
    { name: 'Courses', path: '/courses' },
  ];

  const learningPaths = [
    'Web Development',
    'Data Science',
    'Cloud Computing',
    'AI & Machine Learning',
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-primary-navy/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-20">

          {/* Brand */}
          <div className="space-y-8">
            <img
              src={Logo}
              alt="Jazeera ICT Girls Logo"
              className="w-12 h-auto"
            />

            <p className="text-primary-navy/80 leading-relaxed max-w-md text-base">
              Empowering Somali girls through quality tech education, real mentorship,
              and a strong sisterhood.
            </p>

            <div className="flex flex-wrap gap-5">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-14 h-14 rounded-full bg-white border border-primary-navy/10 flex items-center justify-center text-primary-navy hover:text-primary-tech hover:border-primary-tech hover:shadow-lg transition-all"
                >
                  <social.icon className="text-2xl" />
                </a>
              ))}
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-primary-tech text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-primary-tech/90 hover:shadow-xl transition-all group"
            >
              Contact Us
              <HiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-2xl text-primary-navy mb-8">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-navy/80 hover:text-primary-tech transition flex items-center gap-3 text-base group"
                  >
                    <span className="w-2.5 h-2.5 bg-primary-tech rounded-full group-hover:scale-125 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Paths */}
          <div>
            <h3 className="font-bold text-2xl text-primary-navy mb-8">
              Learning Paths
            </h3>
            <ul className="space-y-4">
              {learningPaths.map((path) => (
                <li key={path} className="flex items-center gap-3 text-base text-primary-navy/80">
                  <span className="w-2.5 h-2.5 bg-primary-tech/70 rounded-full" />
                  {path}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-10">
            <div>
              <h3 className="font-bold text-2xl text-primary-navy mb-8">
                Contact Info
              </h3>

              <div className="space-y-6 text-base text-primary-navy/80">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-white border border-primary-navy/10 flex items-center justify-center">
                    <HiLocationMarker className="text-primary-tech text-2xl" />
                  </div>
                  <p>
                    Jazeera University ICT Department<br />
                    Mogadishu, Somalia
                  </p>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-white border border-primary-navy/10 flex items-center justify-center">
                    <HiMail className="text-primary-tech text-2xl" />
                  </div>
                  <a href="mailto:ictgirls@aljazeera.edu" className="hover:text-primary-tech transition">
                    ictgirls@aljazeera.edu
                  </a>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full bg-white border border-primary-navy/10 flex items-center justify-center">
                    <HiPhone className="text-primary-tech text-2xl" />
                  </div>
                  <a href="tel:+252611234567" className="hover:text-primary-tech transition">
                    +252 61 123 4567
                  </a>
                </div>
              </div>
            </div>

         
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-primary-navy/10 mt-20 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-base text-primary-navy/70">
            <p>© {currentYear} Jazeera University ICT Girls Initiative. All rights reserved.</p>

            <div className="flex flex-wrap gap-8">
              <Link to="/privacy" className="hover:text-primary-tech transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-tech transition">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="hover:text-primary-tech transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
