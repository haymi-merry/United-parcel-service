import { useState, useEffect } from "react";
import {
  FaQuestionCircle,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TypeAnimation } from "react-type-animation";

const App = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showCustomerService, setShowCustomerService] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleCustomerService = () => {
    setShowCustomerService(!showCustomerService);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollIntoSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    return () => clearTimeout(id);
  }, []);

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#232110]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#f9e106] animate-pulse" />
          <p className="text-white font-semibold">Loading Shipments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#181811] font-['Space_Grotesk','Noto_Sans',sans-serif] overflow-x-hidden">
      <div className="flex flex-col h-full grow container mx-auto">
        <header className="flex items-center justify-between border-b border-[#3a3927] px-4 py-3 sm:px-6 md:px-10">
          <div className="flex items-center gap-4 text-white">
            <div className="w-4 h-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2
              onClick={() => scrollIntoSection("home")}
              className="text-lg font-bold tracking-tight cursor-pointer sm:text-xl"
            >
              United Parcel Services
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <nav
              className={`md:flex ${
                isMobileMenuOpen ? "flex" : "hidden"
              } flex-col md:flex-row gap-4 md:gap-8 absolute md:static top-16 left-0 w-full md:w-auto bg-[#181811] md:bg-transparent p-4 md:p-0 z-10`}
            >
              <Link
                to="/about"
                className="text-white text-sm font-medium hover:text-[#f9f506]"
                onClick={() => scrollIntoSection("about")}
              >
                About
              </Link>
              <a
                href="#contact"
                className="text-white text-sm font-medium hover:text-[#f9f506]"
                onClick={() => scrollIntoSection("contact")}
              >
                Contact
              </a>
              <a
                href="#services"
                className="text-white text-sm font-medium hover:text-[#f9f506]"
                onClick={() => scrollIntoSection("services")}
              >
                Services
              </a>
              <a
                href="#updates"
                className="text-white text-sm font-medium hover:text-[#f9f506]"
                onClick={() => scrollIntoSection("updates")}
              >
                Updates
              </a>
            </nav>
            <Button
              className="md:hidden text-white text-2xl"
              variant="ghost"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </Button>
            <Link
              to="/track-parcel"
              className="hidden md:flex min-w-[84px] max-w-[480px] items-center justify-center rounded-lg h-10 px-4 bg-[#f9f506] text-[#181811] text-sm font-bold tracking-[0.015em]"
            >
              <span className="truncate">Track</span>
            </Link>
          </div>
        </header>
        <motion.div
          className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-5 flex flex-1 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMounted ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col w-full max-w-5xl">
            <div className="p-4 sm:p-6 md:p-8">
              <div
                className="flex min-h-[300px] sm:min-h-[400px] md:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-lg items-center justify-center p-4 sm:p-6"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1560463097-aed8110ae916?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")`,
                }}
              >
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center">
                  <TypeAnimation
                    sequence={[
                      "Welcome to United Parcel Services",
                      1000,
                      " ",
                      500,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    cursor={true}
                  />
                </h1>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    to="/track-parcel"
                    className="min-w-[84px] max-w-[480px] rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-[#f9f506] text-[#181811] text-sm sm:text-base font-bold tracking-[0.015em] flex items-center justify-center"
                  >
                    <span className="truncate">Track Your Parcel</span>
                  </Link>
                  <Link
                    to="/solutions"
                    className="min-w-[84px] max-w-[480px] rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-[#3a3927] text-white text-sm sm:text-base font-bold tracking-[0.015em] flex items-center justify-center"
                  >
                    <span className="truncate">Explore Our Solutions</span>
                  </Link>
                </div>
              </div>
            </div>
            <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight px-4 pb-3 pt-5">
              Navigating Latest Tariff Development
            </h2>
            <p className="text-white text-base font-normal px-4 pb-3 pt-1">
              Stay informed about the latest tariff changes affecting
              international shipping. We're committed to providing transparent
              and up-to-date information to help you manage your logistics
              effectively.
            </p>
            <div className="flex px-4 py-3 justify-start">
              <Link
                to="/solutions"
                className="min-w-[84px] max-w-[480px] rounded-lg h-10 px-4 bg-[#f9f506] text-[#181811] text-sm font-bold tracking-[0.015em] flex items-center justify-center"
              >
                <span className="truncate">Explore Our Solutions</span>
              </Link>
            </div>
            <h2
              id="services"
              className="text-white text-xl sm:text-2xl font-bold tracking-tight px-4 pb-3 pt-5"
            >
              Our Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{
                      backgroundImage: `url("https://images.unsplash.com/photo-1585393751416-0c3509b8c79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")`,
                    }}
                  ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">
                      Express Delivery
                    </p>
                    <p className="text-[#bbba9b] text-sm font-normal leading-normal">
                      Fast and reliable delivery for urgent shipments.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{
                      backgroundImage: `url("https://images.unsplash.com/photo-1560463097-aed8110ae916?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")`,
                    }}
                  ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">
                      Freight Forwarding
                    </p>
                    <p className="text-[#bbba9b] text-sm font-normal leading-normal">
                      Efficient and cost-effective solutions for large
                      shipments.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{
                      backgroundImage: `url("https://images.unsplash.com/photo-1578575437136-5276340b5e4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")`,
                    }}
                  ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">
                      Customs Brokerage
                    </p>
                    <p className="text-[#bbba9b] text-sm font-normal leading-normal">
                      Expert assistance with customs clearance processes.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{
                      backgroundImage: `url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")`,
                    }}
                  ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">
                      Warehousing
                    </p>
                    <p className="text-[#bbba9b] text-sm font-normal leading-normal">
                      Secure and flexible storage options for your goods.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            <h2
              id="updates"
              className="text-white text-xl sm:text-2xl font-bold tracking-tight px-4 pb-3 pt-5"
            >
              Important Updates
            </h2>
            <div className="flex overflow-x-auto snap-x snap-mandatory [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-4 gap-3">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-[80%] sm:min-w-[40%] md:min-w-[30%]"
              >
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1585393751416-0c3509b8c79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")`,
                  }}
                ></div>
                <div>
                  <p className="text-white text-base font-medium leading-normal">
                    Service Update: New Delivery Routes
                  </p>
                  <p className="text-[#bbba9b] text-sm font-normal leading-normal">
                    We've expanded our delivery network to include new routes
                    for faster service.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-[80%] sm:min-w-[40%] md:min-w-[30%]"
              >
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1578575437136-5276340b5e4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")`,
                  }}
                ></div>
                <div>
                  <p className="text-white text-base font-medium leading-normal">
                    Holiday Shipping Deadlines
                  </p>
                  <p className="text-[#bbba9b] text-sm font-normal leading-normal">
                    Plan your holiday shipments ahead with our updated
                    deadlines.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-[80%] sm:min-w-[40%] md:min-w-[30%]"
              >
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")`,
                  }}
                ></div>
                <div>
                  <p className="text-white text-base font-medium leading-normal">
                    Warehouse Expansion Announcement
                  </p>
                  <p className="text-[#bbba9b] text-sm font-normal leading-normal">
                    Our new warehouse facility is now open, offering more
                    storage capacity.
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="flex justify-end overflow-hidden px-4 sm:px-5 pb-5">
              <motion.button
                className="flex max-w-[480px] items-center justify-center rounded-lg h-14 px-5 bg-[#f9f506] text-[#181811] text-base font-bold tracking-[0.015em] min-w-0 gap-4 pl-4 pr-6"
                whileHover={{ scale: 1.05 }}
                onClick={toggleCustomerService}
              >
                <div className="text-[#181811] text-2xl">
                  <FaQuestionCircle />
                </div>
                <span className="truncate">Customer Service</span>
              </motion.button>
            </div>
            {showCustomerService && (
              <motion.div
                className="fixed bottom-20 right-5 bg-white p-4 rounded-lg shadow-lg w-[90%] sm:w-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
              >
                <h3 className="text-black mb-2">Contact Us</h3>
                <form className="flex flex-col gap-2">
                  <Input
                    type="text"
                    placeholder="Name"
                    className="border p-2 w-full"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full"
                  />
                  <Textarea
                    placeholder="Message"
                    className="border p-2 w-full"
                  />
                  <Button
                    type="submit"
                    className="bg-[#f9f506] text-[#181811] p-2"
                  >
                    Send
                  </Button>
                </form>
              </motion.div>
            )}
            <footer className="flex flex-col gap-6 px-4 sm:px-5 py-10 text-center">
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to=""
                  className="text-[#bbba9b] hover:text-[#f9f506] cursor-pointer text-2xl"
                >
                  <FaTwitter />
                </Link>
                <Link
                  to=""
                  className="text-[#bbba9b] hover:text-[#f9f506] cursor-pointer text-2xl"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to=""
                  className="text-[#bbba9b] hover:text-[#f9f506] cursor-pointer text-2xl"
                >
                  <FaInstagram />
                </Link>
              </div>
              <p className="text-white font-semibold">
                {new Date().toISOString().split("T")[0]}
              </p>
              <p
                id="contact"
                className="text-[#bbba9b] text-base font-normal leading-normal"
              >
                Contact us at{" "}
                <Link
                  target="_blank"
                  to="https://mail.google.com/mail/?view=cm&fs=1&to=unitedparcels880@gmail.com"
                  className="text-[#f9f506] mx-1 border-b border-[#f9f506]"
                >
                  unitedparcels880@gmail.com
                </Link>{" "}
                or WhatsApp
                <Link
                  className="text-[#f9f506] mx-1 border-b border-[#f9f506]"
                  target="_blank"
                  to="https://wa.me/31610928914"
                >
                  +31610928914
                </Link>
                . Follow us on social media.
              </p>
            </footer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
