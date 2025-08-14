// src/components/ShipmentTracker.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
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

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/* ----------------------------- Types & Data ------------------------------ */

type ShipmentStatus = "shipped" | "in_transit" | "delivered";

type ShipmentEvent = {
  id: string;
  status: ShipmentStatus;
  time: string; // human-readable for demo
  location: string;
  coords: [number, number];
  note?: string;
};

type Shipment = {
  trackingId: string;
  imageUrl?: string;
  estimatedDelivery?: string;
  events: ShipmentEvent[];
};

/* ---------------------------- Helper Component --------------------------- */
/** Fit the map to the given points (safe: will no-op if map not ready) */
function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (!map || points.length === 0) return;
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
  }, [map, points]);
  return null;
}

/* --------------------------- ShipmentTracker ---------------------------- */

export default function ShipmentTracker() {
  // Demo initial shipment (replace/load from API)
  const [shipment, setShipment] = useState<Shipment>(() => ({
    trackingId: "1234567890",
    imageUrl:
      "https://i.postimg.cc/tRwqbL4v/032-A6682-A47-F-4199-83-C2-345-FCD50-F1-BA.jpg",
    estimatedDelivery: "Aug 15, 2025",
    events: [
      {
        id: "e1",
        status: "shipped",
        time: "Aug 12, 2025 10:00 AM",
        location: "Amsterdam, NL",
        coords: [52.370216, 4.895168],
        note: "Scanned at origin facility",
      },
      {
        id: "e2",
        status: "in_transit",
        time: "Aug 13, 2025 02:00 PM",
        location: "Frankfurt, DE",
        coords: [50.110924, 8.682127],
        note: "Arrived at regional hub",
      },
      {
        id: "e3",
        status: "delivered",
        time: "Aug 14, 2025 11:00 AM",
        location: "Paris, FR",
        coords: [48.856613, 2.352222],
        note: "Delivered to recipient",
      },
    ],
  }));

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(true); // 2s preloader
  const [focusedEventId, setFocusedEventId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [newLatLng, setNewLatLng] = useState<string>(""); // "lat,lng"
  const mapRef = useRef<L.Map | null>(null);

  // Preloader for 2 seconds to match spec
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // route points memoized for performance
  const routePoints = useMemo(
    () => shipment.events.map((e) => e.coords),
    [shipment.events]
  );

  // when focusedEventId changes, pan map to location
  useEffect(() => {
    if (!focusedEventId || !mapRef.current) return;
    const ev = shipment.events.find((x) => x.id === focusedEventId);
    if (!ev) return;
    mapRef.current.setView(ev.coords as L.LatLngExpression, 10, {
      animate: true,
    });
  }, [focusedEventId, shipment.events]);

  // Add a new "in_transit" event from lat,lng input (simple client-side demo)
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = newLatLng.split(",").map((p) => p.trim());
    if (parts.length !== 2) {
      alert("Enter coordinates as: lat,lng (e.g. 48.8566,2.3522)");
      return;
    }
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      alert("Invalid numeric coordinates.");
      return;
    }

    const newEvent: ShipmentEvent = {
      id: `e${Date.now()}`,
      status: "in_transit",
      time: new Date().toLocaleString(),
      location: `Custom (${lat.toFixed(3)}, ${lng.toFixed(3)})`,
      coords: [lat, lng],
      note: "Customer change request",
    };

    setShipment((s) => ({ ...s, events: [...s.events, newEvent] }));
    setNewLatLng("");
    setShowAddressForm(false);
    setFocusedEventId(newEvent.id);
  };

  if (isLoading) {
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
      <header className="flex items-center justify-between border-b border-[#4a4621] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 text-[#f9e106]">
            <FaTruck size={24} />
          </div>
          <h1 className="text-lg font-bold">SwiftShip</h1>
        </div>

        <nav className="flex items-center gap-5">
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

      <main className="max-w-6xl mx-auto p-6">
        {/* Top area */}
        <section className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Tracking Details</h2>
            <p className="text-[#ccc68e]">Tracking ID: {shipment.trackingId}</p>

            <div className="mt-4 bg-[#181811] p-4 rounded-xl">
              <p className="font-semibold">Package Information</p>
              <p className="text-[#ccc68e]">
                Estimated Delivery: {shipment.estimatedDelivery}
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
              src={shipment.imageUrl}
              alt="Package preview"
              className="w-full h-56 object-cover rounded-xl shadow-md"
            />
          </div>
        </section>

        {/* Map + timeline */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div className="bg-[#181811] p-4 rounded-xl">
            <h3 className="font-semibold mb-3">Map & Route</h3>

            <MapContainer
              className="h-96 w-full rounded-md"
              center={routePoints[0] || [51.505, -0.09]}
              zoom={6}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <FitBounds points={routePoints} />
              <Polyline
                positions={routePoints}
                pathOptions={{ color: "#f9e106", weight: 4 }}
              />
              {shipment.events.map((ev) => (
                <Marker key={ev.id} position={ev.coords}>
                  <Popup>
                    <div className="max-w-xs">
                      <p className="font-semibold">{ev.location}</p>
                      <p className="text-sm text-[#ccc68e]">{ev.time}</p>
                      <p className="mt-2 text-sm">{ev.note}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            <div className="mt-3 flex justify-end">
              <button
                className="rounded-full bg-[#f9e106] text-[#232110] px-4 py-2 font-medium"
                onClick={() => setShowAddressForm((s) => !s)}
              >
                Need a change of delivery address?
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleAddAddress} className="mt-3 space-y-2">
                <label className="block text-sm text-[#ccc68e]">
                  Provide coordinates (lat,lng)
                  <input
                    value={newLatLng}
                    onChange={(e) => setNewLatLng(e.target.value)}
                    placeholder="e.g. 48.8566,2.3522"
                    className="mt-1 w-full rounded-md bg-[#232110] border border-[#3b3b2a] px-3 py-2 text-white text-sm"
                  />
                </label>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false);
                      setNewLatLng("");
                    }}
                    className="px-4 py-2 rounded-md border border-[#3b3b2a]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[#f9e106] text-[#232110] font-medium"
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
              {shipment.events.map((ev) => (
                <div
                  key={ev.id}
                  className="flex gap-3 items-start cursor-pointer"
                  onClick={() => setFocusedEventId(ev.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setFocusedEventId(ev.id);
                  }}
                >
                  <div className="mt-1">
                    {ev.status === "shipped" && (
                      <i className="text-[#f9e106]">
                        <FaMapMarkerAlt />
                      </i>
                    )}
                    {ev.status === "in_transit" && (
                      <i className="text-[#f9e106]">
                        <FaTruck />
                      </i>
                    )}
                    {ev.status === "delivered" && <FaCheckCircle />}
                  </div>
                  <div>
                    <p className="font-medium">
                      {ev.status === "in_transit"
                        ? "In Transit"
                        : ev.status === "shipped"
                        ? "Shipped"
                        : "Delivered"}
                    </p>
                    <p className="text-[#ccc68e] text-sm">{ev.time}</p>
                    <p className="text-sm mt-1">{ev.location}</p>
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

        <footer className="mt-8 text-center text-[#ccc68e]">
          Contact us at{" "}
          <span className="text-white">unitedparcels880@gmail.com</span> or
          WhatsApp <span className="text-white">+31610928914</span>.
        </footer>
      </main>
    </div>
  );
}
