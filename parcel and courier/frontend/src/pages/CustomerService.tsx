import type { TAppDispatch, TRootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, X } from "lucide-react";
import { fetchMessages } from "@/features/customerSupportSlice";
import type { ICustomerSupport } from "@/lib/types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ import Swal

// Utility to open Gmail compose
function openGmail(email: string) {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}`;
  window.open(gmailUrl, "_blank");
}

// Reusable component for attachments
const Attachments: React.FC<{
  attachments?: string;
  onClick: (img: string) => void;
}> = ({ attachments, onClick }) => {
  if (!attachments) return <span>No Attachments</span>;
  return (
    <div className="flex flex-wrap gap-2">
      <img
        src={attachments}
        alt="Attachment"
        className="h-16 w-16 md:h-20 md:w-20 rounded-lg object-cover border border-[#4a4621] cursor-pointer hover:opacity-80 transition"
        onClick={() => onClick(attachments)}
      />
    </div>
  );
};

// Desktop Table Component
const RequestTable: React.FC<{
  requests: ICustomerSupport[];
  onImageClick: (img: string) => void;
}> = ({ requests, onImageClick }) => (
  <div className="hidden md:flex overflow-hidden rounded-xl border border-[#6a642f] bg-[#232110]">
    <table className="w-full">
      <thead>
        <tr className="bg-[#353218]">
          <th className="px-4 py-3 text-left text-white">Name</th>
          <th className="px-4 py-3 text-left text-white">Email</th>
          <th className="px-4 py-3 text-left text-white">Message</th>
          <th className="px-4 py-3 text-left text-white">Attachments</th>
          <th className="px-4 py-3 text-left text-white">Action</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr key={req.support_id} className="border-t border-t-[#6a642f]">
            <td className="px-4 py-2 text-[#ccc68e]">{req.name}</td>
            <td className="px-4 py-2 text-[#ccc68e]">{req.email}</td>
            <td className="px-4 py-2 text-[#ccc68e]">{req.message}</td>
            <td className="px-4 py-2 text-[#ccc68e]">
              <Attachments attachments={req.img_url} onClick={onImageClick} />
            </td>
            <td className="px-4 py-2">
              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-2"
                onClick={() => openGmail(req.email)}
              >
                <Mail className="h-4 w-4" /> Send Email
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Mobile Card Component
const RequestCards: React.FC<{
  requests: ICustomerSupport[];
  onImageClick: (img: string) => void;
}> = ({ requests, onImageClick }) => (
  <div className="md:hidden flex flex-col gap-4">
    {requests.map((req) => (
      <div
        key={req.support_id}
        className="flex flex-col rounded-xl border border-[#6a642f] bg-[#232110] p-4"
      >
        <p className="text-white font-bold">{req.name}</p>
        <p className="text-[#ccc68e] text-sm">{req.email}</p>
        <p className="text-[#ccc68e] mt-2">{req.message}</p>

        <div className="mt-2">
          <Attachments attachments={req.img_url} onClick={onImageClick} />
        </div>

        <Button
          className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-2"
          onClick={() => openGmail(req.email)}
        >
          <Mail className="h-4 w-4" /> Send Email
        </Button>
      </div>
    ))}
  </div>
);

const CustomerService: React.FC = () => {
  const dispatch = useDispatch<TAppDispatch>();
  const { messages, loading, error } = useSelector(
    (state: TRootState) => state.customerSupport
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  // Error handling with retry
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Failed to load messages. Please try again.",
        showCancelButton: true,
        confirmButtonText: "Retry",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(fetchMessages());
        }
      });
    }
  }, [error, dispatch]);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#232110] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between border-b border-b-[#4a4621] px-4 sm:px-6 md:px-10 py-3">
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
            <Link to="/home" className="text-white text-lg font-bold">
              United Parcel Service
            </Link>
          </div>
          <nav className="flex gap-4 sm:gap-8 mt-3 sm:mt-0">
            {[
              { label: "Dashboard", to: "/admin-dashboard" },
              { label: "Requests", to: "/address-change-request" },
              { label: "About", to: "/about" },
              { label: "Track", to: "/track-parcel" },
            ].map((link) => (
              <Link
                key={link.label}
                className="text-white text-sm hover:underline"
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Content */}
        <main className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-5xl py-5">
            <header className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex flex-col gap-3">
                <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                  Customer Service Requests
                </p>
                <p className="text-[#ccc68e] text-sm">
                  Review and respond to customer service inquiries.
                </p>
              </div>
            </header>

            {/* Loading Indicator */}
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="h-10 w-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <RequestTable
                  requests={messages}
                  onImageClick={setSelectedImage}
                />
                <RequestCards
                  requests={messages}
                  onImageClick={setSelectedImage}
                />
              </>
            )}
          </div>
        </main>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <button
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedImage}
            alt="Full Preview"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default CustomerService;
