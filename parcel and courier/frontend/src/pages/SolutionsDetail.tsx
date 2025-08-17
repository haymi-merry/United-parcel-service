import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaTruck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}
const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link to={to} className="text-white text-sm font-medium hover:text-[#3a3927] transition">
    {children}
  </Link>
);

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ children, className = "", onClick }) => (
  <motion.button
    className={`min-w-[84px] max-w-[480px] rounded-lg h-10 px-4 bg-[#3a3927] text-white text-sm font-bold truncate ${className}`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

interface Service {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  image: string;
}
const ServiceCard: React.FC<Service> = ({ titleKey, subtitleKey, descriptionKey, image }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="flex flex-col md:flex-row items-stretch justify-start rounded-lg bg-[#1f1f1a] overflow-hidden shadow-lg min-h-[300px]"
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-full md:w-1/2 h-64 md:h-auto">
        <img src={image} alt={t(titleKey)} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="flex w-full md:w-1/2 flex-col gap-2 py-4 px-4">
        <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          {t(titleKey)}
        </p>
        <p className="text-[#bbba9b] text-base font-medium">{t(subtitleKey)}</p>
        <p className="text-[#bbba9b] text-sm">{t(descriptionKey)}</p>
      </div>
    </motion.div>
  );
};

const SolutionsDetail: React.FC = () => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const services: Service[] = useMemo(
    () => [
      {
        titleKey: "solutions.domestic.title",
        subtitleKey: "solutions.domestic.subtitle",
        descriptionKey: "solutions.domestic.description",
        image: "https://images.unsplash.com/photo-1628157588553-90a3c068b7f3?auto=format&fit=crop&w=800&q=80",
      },
      {
        titleKey: "solutions.tracking.title",
        subtitleKey: "solutions.tracking.subtitle",
        descriptionKey: "solutions.tracking.description",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      },
      {
        titleKey: "solutions.specialized.title",
        subtitleKey: "solutions.specialized.subtitle",
        descriptionKey: "solutions.specialized.description",
        image: "https://images.unsplash.com/photo-1578898883746-7c3d6f7e3e82?auto=format&fit=crop&w=800&q=80",
      },
      {
        titleKey: "solutions.warehousing.title",
        subtitleKey: "solutions.warehousing.subtitle",
        descriptionKey: "solutions.warehousing.description",
        image: "https://images.unsplash.com/photo-1594705628252-9361a77f4b71?auto=format&fit=crop&w=800&q=80",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#181811] font-['Space_Grotesk','Noto_Sans',sans-serif]">
      <header className="flex flex-col md:flex-row items-center justify-between border-b border-[#3a3927] px-4 md:px-10 py-3">
        <div className="flex items-center gap-4 text-white">
          <FaTruck className="w-5 h-5" />
          <h2 className="text-lg font-bold tracking-[-0.015em]">{t('header.services')}</h2>
        </div>
        <div className="flex flex-1 flex-col md:flex-row justify-end gap-4 md:gap-8 mt-2 md:mt-0">
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-9">
            <NavLink to="/track-parcel">{t('common.track')}</NavLink>
            <NavLink to="/create-shipment">{t('common.ship')}</NavLink>
            <NavLink to="/locations">{t('common.locations')}</NavLink>
            <NavLink to="/support">{t('common.support')}</NavLink>
          </div>
          <Button onClick={() => window.location.href = '/admin-login'}>
            {t('common.login')}
          </Button>
        </div>
      </header>

      <motion.main
        className="flex flex-1 justify-center py-5 px-4 sm:px-8 lg:px-16 xl:px-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col w-full max-w-[960px] space-y-6">
          {/* Hero Section */}
          <motion.section
            className="min-h-[300px] bg-cover bg-center flex flex-col justify-end rounded-lg"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 25%), url('https://images.unsplash.com/photo-1556740764-3a5a6344b2f6?auto=format&fit=crop&w=1350&q=80')`,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="p-4 text-white text-xl md:text-2xl lg:text-[28px] font-bold tracking-tight">
              {t('solutions.title')}
            </p>
          </motion.section>

          {/* Services Section */}
          <section className="flex flex-col gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                titleKey={service.titleKey}
                subtitleKey={service.subtitleKey}
                descriptionKey={service.descriptionKey}
                image={service.image}
              />
            ))}
          </section>
        </div>
      </motion.main>
    </div>
  );
};

export default SolutionsDetail;
