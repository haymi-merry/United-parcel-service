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
    className="flex gap-x-5  @xl:flex-row items-stretch justify-start rounded-lg"
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.3 }}
    viewport={{ once: true }}
  >
    <div
      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
      style={{ backgroundImage: `url("${image}")` }}
    ></div>
    <div className="flex w-full min-w-72 grow flex-col gap-1 py-4 @xl:px-4">
      <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
        {title}
      </p>
      <p className="text-[#bbba9b] text-base font-normal">{subtitle}</p>
      <p className="text-[#bbba9b] text-base font-normal">{description}</p>
    </div>
  </motion.div>
);

const SolutionsDetail: React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const services: Service[] = [
    {
      title: "Domestic Shipping",
      subtitle: "Fast and reliable delivery within the country",
      description:
        "SwiftShip offers a range of shipping solutions tailored to meet your specific needs. Whether you're sending a small package across town or managing complex logistics for international shipments, we have the expertise and resources to ensure your goods arrive safely and on time.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA4OZRAq263F-rzxIjtEIIi1sHblUJMqq54DuoqIrOPVOzk5g-fn_G57WZ4CD_XbqBfZBk5wjT6VmRRdmqCxLna_H3QFYXE4eANv-m1YYff3L08roePi1GNUs9jo2oTwadKXUJ_cRM6OaB8T1CjdFSJymuaOXVCaZCDc4SiU3aCnjpAqK980aVJ50hRJKkNWT5sN4ZJq78QHBiZo8aROTfn6M2emZmxqATPky6JRCDeLGm2qUenx6MIBcduyi4DwxqNJHszyOEz5M4",
    },
    {
      title: "International Shipping",
      subtitle: "Global reach with expert handling",
      description:
        "Our international shipping services connect you to a global network, ensuring seamless delivery across borders. We handle all aspects of customs clearance, documentation, and logistics, so you can focus on your business while we take care of the rest.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAggSWjTcEmn0duJc3_tPxJ0rDoNP3yPdA5u04ybaduCD6mBGLvCH47KY1uIgSn88FX-XNUefBePbs9fjtnwJlDIj2xohJ9j37_j26P0RgxF3kGoy-cqtJNcm7j3RWcb00FuXxP37K_V6x71mKCOdplcFHW7_p9mI1Xk4qwRmjWhNj68Ime_wMhZy7crVxNWj498aB5TuUX257s93x3Cd7QELwHt0b-LIIr3tabZJCyl5DnEbDVxcyFXG79L78-zD0foTxIpeiFkTI",
    },
    {
      title: "Specialized Logistics",
      subtitle: "Customized solutions for unique needs",
      description:
        "SwiftShip's specialized logistics solutions cater to unique shipping requirements. From temperature-sensitive goods to oversized items, we provide customized handling and transportation to ensure the integrity and safety of your shipments.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuASLInLL8BUfeT_n_CZ_T8A6-SViS_-SV_0fsQdG_6gmVxFj2D_KlYYejpjSce4IiqBkK6hqVxv1UxWET_dPAguX-zBAFxJZiaTQ40deMBA_cGu6GFuxh_CFS4Usuw4exaknmfK2wKkvUnd6rPv9n-J2h6JcnhHRfMsLHIiFjvp7bXWtDAQYwapBMte7NQScxXUyvSDxeBWDZHe_lZMPD-DnCYXAXCq7Lmel6McVOqSYn5lb0HLVlO-v8fc39Wd7N6-DLv4Hpih6JQ",
    },
    {
      title: "Warehousing & Distribution",
      subtitle: "Secure storage and efficient fulfillment",
      description:
        "Our warehousing and distribution services offer secure storage and efficient order fulfillment. We manage inventory, process orders, and coordinate shipments, providing a streamlined solution for your supply chain needs.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA3iUaKgeiLKl_tqId05f-qRhVqBwjhuV4dYoBC_168acN-wEgdSeNfS7ZV3jE6eI254G8MTDURJosTg0xbIvfinK8kB6q0TmR6AHRQCP4GPBt8C8i3c-JiglNGu9AxZ8cH9NxusF1tAXm8kjnRrTlNFiAOrJb95-MQ_9NmkOxTSQZECxiP-DBjp0Z9YK_pRnrxDggasIq9JcdkfY-gawJhdhtaSUilv3AMvuPSRA-xqc7c3dVjlg3mc1jUdpWnjPp-zMdRxmk_Gos",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#181811] font-['Space_Grotesk','Noto_Sans',sans-serif]">
      <header className="flex items-center justify-between border-b border-[#3a3927] px-10 py-3">
        <div className="flex items-center gap-4 text-white">
          <i className="text-white w-4 h-4">
            <FaTruck />
          </i>
          <h2 className="text-lg font-bold tracking-[-0.015em]">
            United Parcel Service
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <NavLink href="#">Track</NavLink>
            <NavLink href="#">Ship</NavLink>
            <NavLink href="#">Locations</NavLink>
            <NavLink href="#">Support</NavLink>
          </div>
          <Button>Login</Button>
        </div>
      </header>
      <motion.div
        className="flex flex-1 justify-center py-5 px-4 @xl:px-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col max-w-[960px] flex-1">
          <motion.div
            className="min-h-80 bg-cover bg-center flex flex-col justify-end rounded-lg @xl:rounded-lg"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjzAT_PxNBfDqlEY_bgNnLCokMCJb_gooBdBUF4VxI_SSNVZmTOybbkjP7dsM4o9BfTL0k3KhDA5aA-lfwc7-UFwSmjQ266fyES2frR100z9jTz8EEJgMiQDXcxEhH0l0CqEomUO_Qv4h2WyVUftRkGQiSkSleOOM1Z7mNCYIKzXbsYk18wuWhKPsJUG2FU4dl6Iqwf9sI3EzzfXqQFTYhM8ohrwKluuTsKW4fsKAVLzUyI-6V2YGVCm5kbfNo28MW4dk75rFnhH8")`,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="p-4 text-white text-[28px] font-bold tracking-tight">
              Shipping Solutions
            </p>
          </motion.div>
          <div className="p-4 space-y-4">
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
