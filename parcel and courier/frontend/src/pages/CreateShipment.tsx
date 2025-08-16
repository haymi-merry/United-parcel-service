import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaCalendarAlt, FaDoorOpen } from "react-icons/fa";
import { useFetcher, useNavigate } from "react-router-dom";

interface FormData {
  parcelId: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
  origin: string;
  destination: string;
  packageDescription: string;
  packageWeight: string;
  packageDimensions: string;
  pickupDate: string;
  deliveryDate: string;
  status: "pending" | "shipped off" | "on transit" | "delivered";
  package_name: string;
  quantity: number;
}

interface CreateShipmentProps {
  onLogout: () => void;
}

const CreateShipment: React.FC<CreateShipmentProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    parcelId: "",
    senderName: "",
    senderAddress: "",
    senderPhone: "",
    recipientName: "",
    recipientAddress: "",
    recipientPhone: "",
    origin: "",
    destination: "",
    packageDescription: "",
    packageWeight: "",
    packageDimensions: "",
    pickupDate: "",
    deliveryDate: "",
    status: "pending",
    package_name: "",
    quantity: 1,
  });
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  function onLogout() {
    navigate("/admin-dashboard");
  }

  useEffect(() => {
    if (fetcher.data && fetcher.data.success) {
      setFormData({
        parcelId: "",
        senderName: "",
        senderAddress: "",
        senderPhone: "",
        recipientName: "",
        recipientAddress: "",
        recipientPhone: "",
        origin: "",
        destination: "",
        packageDescription: "",
        packageWeight: "",
        packageDimensions: "",
        pickupDate: "",
        deliveryDate: "",
        status: "pending",
        package_name: "",
        quantity: 1,
      });
      setImage(null);
      setImagePreview(null);
      navigate("/admin-dashboard");
    }
  }, [fetcher.data, navigate]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);
  console.log(image);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  if (fetcher.state === "submitting" || fetcher.state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#232110]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#f9e106] animate-pulse" />
          <p className="text-white font-semibold">Creating Shipments</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <motion.div
        className="min-h-screen flex flex-col bg-[#181811] font-['Space_Grotesk','Noto_Sans',sans-serif] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col md:flex-row flex-1 justify-center py-5 px-4 sm:px-6 gap-4 md:gap-6">
          <div className="flex flex-col w-full md:w-80">
            <motion.div
              className="flex flex-col justify-between bg-[#181811] p-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <motion.button
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#3a3927]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="text-white">
                      <FaPlus size={24} />
                    </i>
                    <p className="text-white text-sm font-medium">
                      Create Shipment
                    </p>
                  </motion.button>

                  <motion.button
                    onClick={onLogout}
                    className="flex items-center gap-3 px-3 py-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="text-white">
                      <FaDoorOpen size={24} />
                    </i>
                    <p className="text-white text-sm font-medium">Logout</p>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="flex flex-col w-full md:max-w-[960px]">
            <motion.div
              className="flex flex-wrap justify-between gap-3 p-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-2xl sm:text-[32px] font-bold tracking-tight">
                Create Shipment
              </p>
            </motion.div>
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <fetcher.Form method="post" encType="multipart/form-data">
                <h3 className="text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">
                  Parcel Information
                </h3>
                {[
                  {
                    label: "Parcel ID",
                    name: "parcelId",
                    placeholder: "Enter parcel id",
                    type: "text",
                  },
                  {
                    label: "Package Name",
                    name: "package_name",
                    placeholder: "Enter package name",
                    type: "text",
                  },
                  {
                    label: "Quantity",
                    name: "quantity",
                    placeholder: "Enter quantity of the parcel",
                    type: "number",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
                  >
                    <label
                      htmlFor={item.name}
                      className="flex flex-col min-w-40 flex-1"
                    >
                      <p className="text-base font-medium pb-2">{item.label}</p>
                      <input
                        name={item.name}
                        id={item.name}
                        type={item.type}
                        value={formData[item.name as keyof FormData]}
                        onChange={handleInputChange}
                        placeholder={item.placeholder}
                        className="w-full rounded-lg bg-[#27271b] border border-[#55553a] h-14 p-[15px] text-base font-normal focus:outline-none focus:ring-0 focus:border-[#55553a] placeholder:text-[#bbba9b]"
                      />
                    </label>
                  </div>
                ))}

                <h3 className="text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">
                  Sender Details
                </h3>
                {[
                  {
                    label: "Name",
                    name: "senderName",
                    placeholder: "Enter sender's name",
                  },
                  {
                    label: "Address",
                    name: "senderAddress",
                    placeholder: "Enter sender's address",
                  },
                  {
                    label: "Phone Number",
                    name: "senderPhone",
                    placeholder: "Enter sender's phone number",
                  },
                ].map((field) => (
                  <div
                    key={field.name}
                    className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
                  >
                    <label
                      htmlFor={field.name}
                      className="flex flex-col min-w-40 flex-1"
                    >
                      <p className="text-base font-medium pb-2">
                        {field.label}
                      </p>
                      <input
                        name={field.name}
                        id={field.name}
                        value={formData[field.name as keyof FormData]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg bg-[#27271b] border border-[#55553a] h-14 p-[15px] text-base font-normal focus:outline-none focus:ring-0 focus:border-[#55553a] placeholder:text-[#bbba9b]"
                      />
                    </label>
                  </div>
                ))}
                <h3 className="text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">
                  Recipient Details
                </h3>
                {[
                  {
                    label: "Name",
                    name: "recipientName",
                    placeholder: "Enter recipient's name",
                  },
                  {
                    label: "Address",
                    name: "recipientAddress",
                    placeholder: "Enter recipient's address",
                  },
                  {
                    label: "Phone Number",
                    name: "recipientPhone",
                    placeholder: "Enter recipient's phone number",
                  },
                ].map((field) => (
                  <div
                    key={field.name}
                    className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
                  >
                    <label
                      htmlFor={field.name}
                      className="flex flex-col min-w-40 flex-1"
                    >
                      <p className="text-base font-medium pb-2">
                        {field.label}
                      </p>
                      <input
                        name={field.name}
                        id={field.name}
                        value={formData[field.name as keyof FormData]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg bg-[#27271b] border border-[#55553a] h-14 p-[15px] text-base font-normal focus:outline-none focus:ring-0 focus:border-[#55553a] placeholder:text-[#bbba9b]"
                      />
                    </label>
                  </div>
                ))}
                <h3 className="text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">
                  Origin & Destination
                </h3>
                {[
                  {
                    label: "Origin",
                    name: "origin",
                    placeholder: "Enter origin",
                  },
                  {
                    label: "Destination",
                    name: "destination",
                    placeholder: "Enter destination",
                  },
                ].map((field) => (
                  <div
                    key={field.name}
                    className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
                  >
                    <label
                      htmlFor={field.name}
                      className="flex flex-col min-w-40 flex-1"
                    >
                      <p className="text-base font-medium pb-2">
                        {field.label}
                      </p>
                      <input
                        name={field.name}
                        id={field.name}
                        value={formData[field.name as keyof FormData]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg bg-[#27271b] border border-[#55553a] h-14 p-[15px] text-base font-normal focus:outline-none focus:ring-0 focus:border-[#55553a] placeholder:text-[#bbba9b]"
                      />
                    </label>
                  </div>
                ))}

                <h3 className="text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">
                  Upload Package Image
                </h3>
                <div className="flex flex-col p-4">
                  <motion.div
                    className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#55553a] px-6 py-14"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-lg font-bold tracking-[-0.015em] text-center">
                      Upload Image
                    </p>
                    <p className="text-sm font-normal text-center">
                      Click to upload or drag and drop
                    </p>
                    <input
                      type="file"
                      name="imageUrl"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />

                    <motion.label
                      htmlFor="image-upload"
                      className="cursor-pointer rounded-lg h-10 px-4 bg-[#3a3927] text-white text-sm font-bold flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      Upload
                    </motion.label>
                    {imagePreview && (
                      <motion.img
                        src={imagePreview}
                        alt="Package Preview"
                        className="w-32 h-32 object-cover rounded-lg mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                </div>
                <h3 className="text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">
                  Shipping Dates
                </h3>
                {[
                  {
                    label: "Pickup Date",
                    name: "pickupDate",
                    placeholder: "Select pickup date",
                  },
                  {
                    label: "Delivery Date",
                    name: "deliveryDate",
                    placeholder: "Select delivery date",
                  },
                ].map((field) => (
                  <div
                    key={field.name}
                    className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
                  >
                    <label
                      htmlFor={field.name}
                      className="flex flex-col min-w-40 flex-1"
                    >
                      <p className="text-base font-medium pb-2">
                        {field.label}
                      </p>
                      <div className="flex w-full items-stretch rounded-lg">
                        <input
                          name={field.name}
                          id={field.name}
                          value={formData[field.name as keyof FormData]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          type="date"
                          className="w-full rounded-lg rounded-r-none bg-[#27271b] border border-[#55553a] border-r-0 h-14 p-[15px] pr-2 text-base font-normal focus:outline-none focus:ring-0 focus:border-[#55553a] placeholder:text-[#bbba9b]"
                        />
                        <div className="flex items-center justify-center pr-[15px] rounded-r-lg border border-[#55553a] border-l-0 bg-[#27271b]">
                          <i className="text-[#bbba9b]">
                            <FaCalendarAlt size={24} />
                          </i>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}

                <h3 className="text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">
                  Transport Information
                </h3>
                <div
                  key="status"
                  className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
                >
                  <label
                    htmlFor="status"
                    className="flex flex-col min-w-40 flex-1"
                  >
                    <p className="text-base font-medium pb-2">Status</p>
                    <div className="flex w-full items-stretch rounded-lg">
                      <select
                        name="status"
                        id="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full rounded-lg rounded-r-none bg-[#27271b] border border-[#55553a] border-r-0 h-14 p-[15px] pr-2 text-base font-normal  focus:outline-none focus:ring-0 focus:border-[#55553a] placeholder:text-[#bbba9b]"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped off">Shipped off</option>
                        <option value="on transit">On transit</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </label>
                </div>
                <div className="flex px-4 py-3 justify-end">
                  <motion.button
                    type="submit"
                    className="min-w-[84px] max-w-[480px] rounded-lg h-10 px-4 bg-[#f9f506] text-[#181811] text-sm font-bold tracking-[0.015em]"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="truncate">
                      {fetcher.state === "idle"
                        ? "Create Shipment"
                        : "Creating..."}
                    </span>
                  </motion.button>
                </div>
              </fetcher.Form>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CreateShipment;
