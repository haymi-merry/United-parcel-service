// src/components/ShipmentTracker.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaTruck, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

/**
 * NOTE:
 * - Make sure you have installed: react-leaflet, leaflet, react-icons
 *   npm install react-leaflet leaflet react-icons
 *
 * - Vite + TypeScript may complain about importing Leaflet's images.
 *   If you see TS errors about importing .png/.jpg, add a `src/vite-env.d.ts`:
 *     declare module '*.png';
 *     declare module '*.jpg';
 *     declare module '*.jpeg';
 *     declare module '*.webp';
 *
 * - This component is self-contained for demo purposes. Split into smaller pieces
 *   (MapView, Timeline, Header, AddressForm) when integrating into a larger app.
 */

/* Fix Leaflet's default icon URLs (works with Vite/Rollup)
   If you prefer not to import images, you can host icons or use a custom marker.
*/
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { TAppDispatch, TRootState } from "@/app/store";
import type { IShipment } from "@/lib/types";
import { fetchShipments } from "@/features/shipmentSlice";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (!map || points.length === 0) return;
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
  }, [map, points]);
  return null;
}

export default function ShipmentTracker() {
  const { id } = useParams();
  const dispatch = useDispatch<TAppDispatch>();
  const [shipment, setShipment] = useState<IShipment | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const { shipment: shipments, loading: isShipmentsLoading } = useSelector(
    (state: TRootState) => state.shipment
  );

  useEffect(() => {
    if (!shipments || shipments.length === 0) dispatch(fetchShipments());
  }, [dispatch, shipments]);

  useEffect(() => {
    const found = shipments.find((s) => s.parcel_id === id);
    if (found) {
      setShipment(found);
    }
  }, [id, shipments]);

  // UI state

  const mapRef = useRef<L.Map | null>(null);

  if (isShipmentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#232110]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#f9e106] animate-pulse" />
          <p className="text-white font-semibold">Loading SwiftShip…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#232110] text-white font-sans">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between border-b border-[#4a4621] px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 text-[#f9e106]">
            <FaTruck size={24} />
          </div>
          <h1 className="text-lg font-bold">United Parcel Service</h1>
        </div>

        <nav className="flex flex-wrap items-center gap-3 mt-2 sm:mt-0 sm:gap-5">
          <a className="text-sm" href="#">
            Services
          </a>
          <a className="text-sm" href="#">
            Pricing
          </a>
          <a className="text-sm" href="#">
            Contact
          </a>
          <button className="rounded-full bg-[#4a4621] px-4 py-2 text-sm">
            Login
          </button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Top area */}
        <section className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold">Tracking Details</h2>
            <p className="text-[#ccc68e]">Tracking ID: {shipment?.parcel_id}</p>

            <div className="mt-4 bg-[#181811] p-4 rounded-xl">
              <p className="font-semibold">Package Information</p>
              <p className="text-[#ccc68e]">
                Estimated Delivery: {shipment?.delivery_date}
              </p>
              <div className="mt-3">
                <button
                  onClick={() => alert("Open details (placeholder)")}
                  className="rounded-full bg-[#4a4621] px-4 py-2 text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-96 mt-2 md:mt-0">
            <img
              src={shipment?.img_url}
              alt="Package preview"
              className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-md"
            />
          </div>
        </section>

        {/* Map + timeline */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div className="bg-[#181811] p-4 rounded-xl">
            <h3 className="font-semibold mb-3">Map & Route</h3>

            <MapContainer
              ref={mapRef}
              className="h-64 sm:h-96 w-full rounded-md"
              center={[51.505, -0.09]}
              zoom={6}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <FitBounds points={[[51.505, -0.09]]} />
              <Polyline
                positions={[
                  [51.505, -0.09],
                  [51.51, -0.1],
                ]}
                pathOptions={{ color: "#f9e106", weight: 2 }}
              />
              {shipment?.transport_history?.map((ev) => (
                <Marker key={ev.transport_id} position={[51.505, -0.09]}>
                  <Popup>
                    <div className="max-w-xs">
                      <p className="font-semibold">{ev.current_location}</p>
                      <p className="text-sm text-[#ccc68e]">
                        {ev.current_time}
                      </p>
                      <p className="mt-2 text-sm">{ev.current_time}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            <div className="mt-3 flex justify-end">
              <button
                className="rounded-full bg-[#f9e106] text-[#232110] px-4 py-2 font-medium text-sm sm:text-base"
                onClick={() => setShowAddressForm((s) => !s)}
              >
                Need a change of delivery address?
              </button>
            </div>

            {showAddressForm && (
              <form className="mt-3 space-y-2">
                <label className="block text-sm text-[#ccc68e]">
                  Provide coordinates (lat,lng)
                  <input
                    value={"45.7"}
                    placeholder="e.g. 48.8566,2.3522"
                    className="mt-1 w-full rounded-md bg-[#232110] border border-[#3b3b2a] px-3 py-2 text-white text-sm"
                  />
                </label>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false);
                    }}
                    className="px-4 py-2 rounded-md border border-[#3b3b2a] text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[#f9e106] text-[#232110] font-medium text-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="bg-[#181811] p-4 rounded-xl">
            <h4 className="font-semibold mb-3">Shipment Progress</h4>

            <div className="space-y-4">
              {shipment?.transport_history?.map((ev, index) => (
                <div
                  key={ev.transport_id}
                  className="flex gap-3 items-start cursor-pointer"
                  role="button"
                  tabIndex={0}
                >
                  <div className="mt-1">
                    {index === 0 && (
                      <i className="text-[#f9e106]">
                        <FaMapMarkerAlt />
                      </i>
                    )}
                    {index === 1 && (
                      <i className="text-[#f9e106]">
                        <FaTruck />
                      </i>
                    )}
                    {index === shipment?.transport_history?.length - 1 && (
                      <i className="text-green-500">
                        <FaCheckCircle />
                      </i>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {index === 1
                        ? "In Transit"
                        : index === 0
                        ? "Shipped"
                        : "Delivered"}
                    </p>
                    <p className="text-[#ccc68e] text-sm">{ev.current_time}</p>
                    <p className="text-sm mt-1">{ev.current_location}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-[#ccc68e]">
              For real-time updates integrate a realtime DB (Supabase/Firebase)
              or webhooks on the server.
            </div>
          </aside>
        </section>

        <footer className="mt-8 text-center text-[#ccc68e] text-sm">
          Contact us at{" "}
          <span className="text-white">unitedparcels880@gmail.com</span> or
          WhatsApp <span className="text-white">+31610928914</span>.
        </footer>
      </main>
    </div>
  );
}
