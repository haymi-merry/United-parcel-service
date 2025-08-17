import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTruck } from "react-icons/fa";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <a
    href={href}
    className="text-white text-sm font-medium hover:text-[#3a3927] transition"
  >
    {children}
  </a>
);

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className }) => (
  <motion.button
    className={`min-w-[84px] max-w-[480px] rounded-lg h-10 px-4 bg-[#3a3927] text-white text-sm font-bold truncate ${
      className || ""
    }`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.button>
);

interface Service {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const ServiceCard: React.FC<Service> = ({
  title,
  subtitle,
  description,
  image,
}) => (
  <motion.div
    className="flex flex-col md:flex-row items-stretch justify-start rounded-lg bg-[#1f1f1a] overflow-hidden shadow-lg min-h-[300px]"
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.3 }}
    viewport={{ once: true }}
  >
    {/* Image */}
    <div className="w-full md:w-1/2 h-64 md:h-auto">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>

    {/* Text Content */}
    <div className="flex w-full md:w-1/2 flex-col gap-2 py-4 px-4">
      <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
        {title}
      </p>
      <p className="text-[#bbba9b] text-base font-medium">{subtitle}</p>
      <p className="text-[#bbba9b] text-sm">{description}</p>
    </div>
  </motion.div>
);

const SolutionsDetail: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const services: Service[] = [
    {
      title: "Domestic Shipping",
      subtitle: "Fast and reliable delivery within the country",
      description:
        "SwiftTrack offers seamless domestic tracking with real-time updates and notifications.",
      image:
        "https://images.unsplash.com/photo-1628157588553-90a3c068b7f3?auto=format&fit=crop&w=800&q=80", // visible courier package
    },
    {
      title: "Real-Time Shipment Tracking",
      subtitle: "Monitor your deliveries with precision",
      description:
        "Our platform provides up-to-the-minute updates on your shipments, ensuring you stay informed every step of the way.",
      image: "https://www.pexels.com/photo/1571460/",
    },
    {
      title: "Specialized Logistics",
      subtitle: "Customized solutions for unique needs",
      description:
        "Monitor sensitive or oversized goods with specialized sensors and real-time reporting.",
      image:
        "https://images.unsplash.com/photo-1578898883746-7c3d6f7e3e82?auto=format&fit=crop&w=800&q=80", // warehouse logistics
    },
    {
      title: "Warehousing & Distribution",
      subtitle: "Secure storage and efficient fulfillment",
      description:
        "Manage your inventory and shipments from warehouse to doorstep with full visibility.",
      image:
        "https://images.unsplash.com/photo-1594705628252-9361a77f4b71?auto=format&fit=crop&w=800&q=80", // warehouse interior
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#181811] font-['Space_Grotesk','Noto_Sans',sans-serif]">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between border-b border-[#3a3927] px-4 md:px-10 py-3">
        <div className="flex items-center gap-4 text-white">
          <FaTruck className="w-5 h-5" />
          <h2 className="text-lg font-bold tracking-[-0.015em]">
            United Parcel Tracking
          </h2>
        </div>
        <div className="flex flex-1 flex-col md:flex-row justify-end gap-4 md:gap-8 mt-2 md:mt-0">
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-9">
            <NavLink href="#">Track</NavLink>
            <NavLink href="#">Ship</NavLink>
            <NavLink href="#">Locations</NavLink>
            <NavLink href="#">Support</NavLink>
          </div>
          <Button>Login</Button>
        </div>
      </header>

      {/* Main Content */}
      <motion.div
        className="flex flex-1 justify-center py-5 px-4 sm:px-8 lg:px-16 xl:px-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col w-full max-w-[960px] space-y-6">
          {/* Hero Section */}
          <motion.div
            className="min-h-[300px] bg-cover bg-center flex flex-col justify-end rounded-lg"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 25%), url('https://images.unsplash.com/photo-1556740764-3a5c6344b2f6?auto=format&fit=crop&w=1350&q=80')`,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="p-4 text-white text-xl md:text-2xl lg:text-[28px] font-bold tracking-tight">
              Shipping Solutions
            </p>
          </motion.div>

          {/* Services Section */}
          <div className="flex flex-col gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                image={service.image}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SolutionsDetail;
