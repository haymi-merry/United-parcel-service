import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutSwiftShip: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#181811] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#3a3927] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <i className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="currentColor"
                ></path>
              </svg>
            </i>
            <h2
              onClick={() => navigate("/")}
              className="text-white cursor-pointer text-lg font-bold leading-tight tracking-[-0.015em]"
            >
              {t('common.welcome') || 'United Parcel Service'}
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <Link
              to="/track-parcel"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#3a3927] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">{t('common.track_parcel') || 'Track Parcel'}</span>
            </Link>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                {t('about.title') || 'About SwiftShip'}
              </p>
            </div>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              {t('about.description') || `
                SwiftShip is a global leader in logistics, offering a wide range
                of solutions for businesses and individuals. With a history
                spanning over a century, we've built a reputation for reliability,
                innovation, and customer satisfaction. Our services include
                package delivery, freight forwarding, supply chain management, and
                specialized solutions for various industries. Our advanced
                tracking system provides real-time visibility of your shipments,
                ensuring transparency and peace of mind. We're committed to
                sustainability and ethical practices, striving to minimize our
                environmental impact and contribute positively to the communities
                we serve. Our team of dedicated professionals is passionate about
                delivering excellence, and we continuously invest in technology
                and infrastructure to enhance our capabilities and meet the
                evolving needs of our customers.
              `}
            </p>
            <div className="flex px-4 py-3 justify-start">
              <button
                onClick={() => navigate(-1)}
                className="pointer hover:bg-[#f9f506] hover:text-stone-800 duration-200 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#3a3927] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">{t('common.back') || 'Back'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSwiftShip;