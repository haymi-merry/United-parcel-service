import { useState, useEffect } from "react";
import {
  FaQuestionCircle,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { TypeAnimation } from "react-type-animation";

const App = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showCustomerService, setShowCustomerService] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleCustomerService = () => {
    setShowCustomerService(!showCustomerService);
  };

  function scrollIntoSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#181811] dark group/design-root overflow-x-hidden font-['Space_Grotesk','Noto_Sans',sans-serif]">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3a3927] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
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
              className="text-white text-lg font-bold leading-tight tracking-[-0.015em]"
            >
              United Parcel Services
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link
                to="/about"
                className="text-white text-sm font-medium leading-normal"
              >
                About
              </Link>
              <a
                href="#contact"
                onClick={() => scrollIntoSection("contact")}
                className="text-white text-sm font-medium leading-normal"
              >
                Contact
              </a>
              <a
                href="#services"
                onClick={() => scrollIntoSection("services")}
                className="text-white text-sm font-medium leading-normal"
              >
                Services
              </a>
              <a
                href="#updates"
                onClick={() => scrollIntoSection("updates")}
                className="text-white text-sm font-medium leading-normal"
              >
                Updates
              </a>
            </div>
            <div className="flex gap-2">
              <Link
                to="/track-parcel"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f9f506] text-[#181811] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Track Your Parcel</span>
              </Link>
            </div>
          </div>
        </header>
        <motion.div
          className="px-40 flex flex-1 justify-center py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMounted ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCAGREbVPBzwxKjVNcqZIswbngRUFvJSJ4YWME9ksWRbM2w6VQpoS8Wv0y349TBHBHbeh2ixiNCfgyb9iqKXEvOwT1Iv3e0xXuQKMSZfzR3ikmCOfe5xXkOndDIaUlJs7hYWKSE0DrgqIaBni_3pV1FmA0VLS_ZL2afWqZwzb9IHk5c7au385LUf3i0jUskq2vdiI0Dbj9YoSTz8i9lXOe8DFWAKssvEdfNYilqjW1KZjSWSLrClMIrXPUYCGLYPbaLJQclrpDElA")`,
                  }}
                >
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] text-center">
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
                  <div className="flex-wrap gap-3 flex justify-center">
                    <Link
                      to={"/track-parcel"}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f9f506] text-[#181811] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                    >
                      <span className="truncate">Track Your Parcel</span>
                    </Link>
                    <Link
                      to={"/solutions"}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#3a3927] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                    >
                      <span className="truncate">Explore Our Solutions</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Navigating Latest Tariff Development
            </h2>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Stay informed about the latest tariff changes affecting
              international shipping. We're committed to providing transparent
              and up-to-date information to help you manage your logistics
              effectively.
            </p>
            <div className="flex px-4 py-3 justify-start">
              <Link
                to="/solutions"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f9f506] text-[#181811] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Explore Our Solutions</span>
              </Link>
            </div>
            <h2
              id="services"
              className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
            >
              Our Services
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPVDhg23R623ksMcUtF6ouzrKlNN7a2zEZ0SfXXfJ-4e057wPOJMyzkcsyXvwX7wYYlYnuIv1-1xk_qgddT8yvO2s4sWqgj3_S4o0vuSuPf2LftGWhCSEp4022EWObaf0ItxG2m0HX7DtgBaDvwJqKwyFBGUjR72WNnSjCWpykO5fX3ue_DCuNK6ps0ONmyW0JuA1aZ7ILWloatz5zPSHp-z9-B4TI9VjcpGbKKyZ361dMaVyZNqXRGLWRYmGFP4Qf4zbRVcKxPRU")`,
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
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAh5cBMEevj41qvDe_tCugWC3zNHtPTnCHOxb2LpoPQfvp5N0X_Zi5wg9sY7nF1ffbr9bz9aFxtr6CPFMlgnTUirO-19ZVHhWVAlVVheYotS04RTvqlEwIX2Zxn_Sas3vmXREqDuNozdj2YHGU-w8QKYHWkOCEpNw3SBfVCeugaJYpfs04GLDFej2A_2zs4MrV9k0OSfU1PkdOSga3QdU8F4Vjq5aK41WJ5SIERzqH2EVWD27P3wH6VnnOYp9ojbModw7WL6h-G5A")`,
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
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCp4NS5SXrZW7vCV-2jA8GK7G4FRWGzS1vje6mAc-fDLALVzVy2UG9w8oAFgPYevwLpnJ5H_klamhNHlHCmrSMj06FevKuhd9r9VvE8QKoYwbiKdbjEQCWbs14hswKVdMzUgkbbBDlKfd2TggRGGPc-5XVo_06XbM50vxTY_B4eHcAbFrsLnN0DO8KE_RqDfw5SAFTeS4nCbrlJHUsOyih_TCMx1UnxjvEVSX7ZoHYmft21tzFfu3o2mT4pFJgmzgwcDmD_UzeFIw8")`,
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
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDm9ucDsO7zxPzDgT4STTggSzP-Lyi6MeU2Lm9Y2JJ896KmeVWe--k81XbOQ7wyaun5br0hBxNpoVQ6wThbs80qGByory1AjLKpTe2ao3pCPpJVUjiL9iSdEzH29O0buVVn6yjwxbPqkoKoL-nPhCs4Zh2ZH1YghwaE7P5GEW_VbQv6VobCIEY2kiKL0GiK9aL2SJNwyRslzAYYhxt5xRxQ0mHJtl6SZItloD7Nx-bpl6o8_1a2xCFlf82VyJ-efrqhd3AAhwYVA84")`,
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
              className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
            >
              Important Updates
            </h2>
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-3">
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col"
                      style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhR5hV__asiUgUfA_QHrbi4FlZ62rJFqY7tDNFHKLQhAKg6cFOnMOmNhWyjg0HnGwkmPCLMFIMh1Y16GXz-v-S9RhKiDgtmuAANrrxuk9VmBTRWqai-wQu1ZrhAsbz6I2r0TBQecQzayygsG8sEFmhNhuBA_nXkoc1g-RtQ-d9V6LkjfopB5PSncvBc5_vGCa_u7YFNSG-6ELg3wSJ67hFuB4CuG0FHiArgjWnTTrNJp9EXlePmS1tiaam89HB8Khu5AU-GBuh_b8")`,
                      }}
                    ></div>
                    <div>
                      <p className="text-white text-base font-medium leading-normal">
                        Service Update: New Delivery Routes
                      </p>
                      <p className="text-[#bbba9b] text-sm font-normal leading-normal">
                        We've expanded our delivery network to include new
                        routes for faster service.
                      </p>
                    </div>
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
                >
                  <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col"
                      style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaWwLiv1IOKnf9E04incnnJjNrOvrF74Jg_Tso6M5Olwv63-IgHxkQX_pIfDkxNFYN2SDNzVJWiGz9KKAycr2KVOeD8hJiITapRt3ixh1YB7Te718zMsh8rydSoAZspA4lq-Rt8ukcW6pKWKD39_IS-eSoiJz_n-Jmw6EL6xcLKE0DjkMo2IzvQ60MzxNGibMM5lJHSrNaMmUsFVCoiGxADA0gcEOsOIOcfgbbMTw4xDhBgMWv9Q4ZWvru3cVZtfFB8QtYg6MV8ak")`,
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
                >
                  <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col"
                      style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAGeUeCOkBDwqiu9cFbjdh9zJKZDtfh8XHsOLow_j5GAhKP0WU0UjixSk-gKxqrfkCkroxrEA2wvSXqv9gjwSrFeVhTEAqx1ZlHII-9V_UHYW1gbQYlQG8hQz8lxEH91sK5a4HKF53P_-zD_L7yM1YpoaY1_JnqhcKxlgwOHCk_oWidt5z0_EVGKtc6cvzBabh4JQtN_zCpvedkv4EnNTvFMMgb3vD3iA3mpQrCyodKFVb6M1uOXUPUhqtx9jkaGd9dE5t5cai9db0")`,
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
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="flex justify-end overflow-hidden px-5 pb-5">
              <motion.button
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-[#f9f506] text-[#181811] text-base font-bold leading-normal tracking-[0.015em] min-w-0 gap-4 pl-4 pr-6"
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
                className="fixed bottom-20 right-5 bg-white p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
              >
                <h3 className="text-black">Contact Us</h3>
                <form>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="border p-2 mb-2 w-full"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="border p-2 mb-2 w-full"
                  />
                  <Textarea
                    placeholder="Message"
                    className="border p-2 mb-2 w-full"
                  ></Textarea>
                  <Button
                    type="submit"
                    className="bg-[#f9f506] text-[#181811] p-2"
                  >
                    Send
                  </Button>
                </form>
              </motion.div>
            )}
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to={""}
                  className="text-[#bbba9b] hover:text-[#f9f506] cursor-pointer text-2xl"
                >
                  <FaTwitter />
                </Link>
                <Link
                  to={""}
                  className="text-[#bbba9b] hover:text-[#f9f506] cursor-pointer text-2xl"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to={""}
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
                {
                  <Link
                    target="_blank"
                    to={
                      "https://mail.google.com/mail/?view=cm&fs=1&to=unitedparcels880@gmail.com"
                    }
                    className="text-[#f9f506] mx-1 border-b-[#f9f506] border-b-1"
                  >
                    unitedparcels880@gmail.com
                  </Link>
                }{" "}
                or WhatsApp
                {
                  <Link
                    className="text-[#f9f506] mx-1 border-b-[#f9f506] border-b-1"
                    target="_blank"
                    to={"https://wa.me/31610928914"}
                  >
                    +31610928914
                  </Link>
                }
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
