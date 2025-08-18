import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { IShipment } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import type { TAppDispatch, TRootState } from "@/app/store";
import { fetchShipments } from "@/features/shipmentSlice";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<TAppDispatch>();

  const { shipment, loading } = useSelector(
    (state: TRootState) => state.shipment
  );
  const { authenticated } = useSelector((state: TRootState) => state.user);

  /** Unauthorized check */
  useEffect(() => {
    if (!authenticated) {
      Swal.fire({
        title: t("admin.unauthorized_title") || "Unauthorized",
        text:
          t("admin.unauthorized_text") ||
          "Please log in to access the dashboard.",
        icon: "warning",
        background: "#232110",
        color: "#bbba9b",
        confirmButtonText: t("common.ok") || "OK",
      }).then(() => navigate("/"));
    }
  }, [authenticated, navigate, t]);

  /** Fetch shipments on mount */
  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  /** Filter shipments */
  const filteredShipment = useMemo(() => {
    if (!searchQuery.trim()) return shipment;
    const query = searchQuery.toLowerCase();
    return shipment.filter((s: IShipment) =>
      [s.parcel_id, s.origin, s.destination, s.status].some((field) =>
        field?.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, shipment]);

  /** Loading state */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#232110]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#f9e106] animate-pulse" />
          <p className="text-white font-semibold">
            {t("admin.loading_shipments") || "Loading Shipments..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#232110] font-[Space Grotesk, Noto Sans, sans-serif] text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#4a4621] px-4 sm:px-8 lg:px-20 py-3">
        <div className="flex w-full justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5" viewBox="0 0 48 48" fill="none">
              <path
                d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                fill="currentColor"
              />
            </svg>
            <h2 className="text-lg font-bold tracking-tight">
              {t("common.welcome") || "United Parcel Service"}
            </h2>
          </div>
          <nav>
            <Link to="/" className="hover:underline">
              {t("header.home") || "Home"}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 justify-center px-4 sm:px-8 lg:px-20 py-6">
        <div className="flex w-full max-w-5xl flex-col">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4">
            <h1 className="min-w-full sm:min-w-[18rem] text-2xl sm:text-3xl font-bold tracking-tight">
              {t("admin.shipments") || "Shipments"}
            </h1>
            <Link
              to="/create-shipment"
              className="h-9 rounded-full bg-[#f9f506] font-semibold flex items-center justify-center text-black px-5 text-sm hover:bg-yellow-400 transition"
            >
              {t("admin.create_shipment") || "Create New Shipment"}
            </Link>
          </div>

          {/* Search */}
          <div className="px-4 py-3">
            <div className="relative flex h-12 w-full">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#ccc68e]" />
              <input
                type="text"
                aria-label={t("admin.search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  t("admin.search_placeholder") ||
                  "Search by tracking number, origin, destination, or status"
                }
                className="h-full w-full rounded-xl bg-[#4a4621] pl-12 pr-4 text-sm sm:text-base placeholder:text-[#ccc68e] focus:outline-none"
              />
            </div>
          </div>

          {/* Shipment List */}
          <div className="space-y-4 p-4">
            {filteredShipment?.length > 0 ? (
              filteredShipment.map((s) => (
                <div
                  key={s.parcel_id}
                  className="flex flex-col sm:flex-row gap-4 rounded-xl bg-[#3a3620] p-4"
                >
                  {/* Info */}
                  <div className="flex flex-col gap-3 flex-1">
                    <p className="text-base font-bold">
                      {t("admin.parcel_id") || "Parcel ID"}: {s.parcel_id}
                    </p>
                    <p className="text-sm text-[#ccc68e]">
                      {t("admin.origin") || "Origin"}: {s.origin} |{" "}
                      {t("admin.destination") || "Destination"}: {s.destination}{" "}
                      | {t("admin.status") || "Status"}: {s.status}
                    </p>
                    <button
                      onClick={() => navigate(`/parcel/${s.parcel_id}`)}
                      className="h-8 w-fit rounded-full bg-[#4a4621] px-4 text-sm font-medium hover:bg-[#5a5531] transition"
                    >
                      {t("admin.view_details") || "View Details"}
                    </button>
                  </div>

                  {/* Image */}
                  {s.img_url && (
                    <div className="flex-1">
                      <img
                        src={s.img_url}
                        alt={`${t("admin.parcel_id") || "Parcel ID"}: ${
                          s.parcel_id
                        }`}
                        className="w-full rounded-xl object-cover aspect-video"
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-[#ccc68e]">
                {t("admin.no_results") || "No results found"}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
