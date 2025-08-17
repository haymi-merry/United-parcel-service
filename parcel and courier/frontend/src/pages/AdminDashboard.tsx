import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { IShipment } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import type { TAppDispatch, TRootState } from "@/app/store";
import { fetchShipments } from "@/features/shipmentSlice";
import Swal from "sweetalert2";

const AdminDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<TAppDispatch>();

  const { shipment, loading } = useSelector(
    (state: TRootState) => state.shipment
  );
  const { authenticated } = useSelector((state: TRootState) => state.user);

  /** Unauthorized check — run only when auth state changes */
  useEffect(() => {
    if (!authenticated) {
      Swal.fire({
        title: "Unauthorized",
        text: "Please log in to create a shipment.",
        icon: "warning",
        background: "#232110",
        color: "#bbba9b",
        confirmButtonText: "OK",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) navigate("/");
      });
    }
  }, [authenticated, navigate]);

  /** Fetch shipments on mount */
  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  /** Derived filtered shipments */
  const filteredShipment = useMemo(() => {
    if (!searchQuery.trim()) return shipment;

    const query = searchQuery.toLowerCase();
    return shipment.filter((s: IShipment) => {
      return (
        s.parcel_id?.toLowerCase().includes(query) ||
        s.origin?.toLowerCase().includes(query) ||
        s.destination?.toLowerCase().includes(query) ||
        s.status?.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, shipment]);

  if (loading) {
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
    <div className="flex min-h-screen flex-col bg-[#232110] font-[Space Grotesk, Noto Sans, sans-serif] text-white">
      <header className="flex items-center justify-between border-b border-[#4a4621] px-10 py-3">
        <div className="flex w-full justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <svg
              className="h-4 w-4"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                fill="currentColor"
              />
            </svg>
            <h2 className="text-lg font-bold tracking-tight">
              United Parcel Service
            </h2>
          </div>
          <nav className="flex items-center gap-9">
            <Link to="/">Home</Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 justify-center px-40 py-5">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4">
            <h1 className="min-w-72 text-3xl font-bold tracking-tight">
              Shipments
            </h1>
            <Link
              to={"/create-shipment"}
              className="h-8 rounded-full bg-[#f9f506] font-semibold flex items-center justify-center text-black px-4 text-sm "
            >
              Create New Shipment
            </Link>
          </div>

          <div className="px-4 py-3">
            <div className="relative flex h-12 w-full">
              <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-[#ccc68e]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tracking number, origin, destination, or status"
                className="h-full w-full rounded-xl border-none bg-[#4a4621] pl-12 pr-4 text-base placeholder:text-[#ccc68e] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-4 p-4">
            {filteredShipment?.map((s) => (
              <div key={s.parcel_id} className="flex gap-4 rounded-xl">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-bold">
                      Parcel ID: {s.parcel_id}
                    </p>
                    <p className="text-sm text-[#ccc68e]">
                      Origin: {s.origin} | Destination: {s.destination} |
                      Status: {s.status}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/parcel/${s.parcel_id}`)}
                    className="h-8 w-fit rounded-full bg-[#4a4621] px-4 text-sm font-medium hover:bg-[#5a5531]"
                  >
                    View Details
                  </button>
                </div>
                {s.img_url && (
                  <div
                    className="flex-1 rounded-xl bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${s.img_url}')`,
                      aspectRatio: "16/9",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
