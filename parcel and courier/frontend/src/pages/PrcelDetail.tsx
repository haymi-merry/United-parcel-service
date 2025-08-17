import React, { useEffect, useMemo, useState } from "react";
import { Package, Truck, Check } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import TrackingForm from "./TrackingForm";

import type { TAppDispatch, TRootState } from "@/app/store";
import { deleteShipmentById, fetchShipments } from "@/features/shipmentSlice";
import { deleteTransistById } from "@/features/transitStatusSlice";
import type { IShipment, ITransportHistory } from "@/lib/types";

type TModelData = {
  transportData: ITransportHistory | null;
  type: "Edit" | "Add";
};

const ParcelDetails: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<TAppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [isTrackingEditorOpen, setIsTrackingEditorOpen] = useState(false);
  const [modelData, setModelData] = useState<TModelData>({
    transportData: null,
    type: "Add",
  });

  const {
    shipment: shipments,
    loading,
    error,
  } = useSelector((state: TRootState) => state.shipment);

  const { authenticated } = useSelector((state: TRootState) => state.user);

  if (!authenticated) {
    Swal.fire({
      title: "Unauthorized",
      text: "Please log in to create a shipment.",
      icon: "warning",
      background: "#232110",
      color: "#bbba9b",
      confirmButtonText: "OK",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        navigate("/");
      }
    });
  }

  const currentShipment: IShipment | null = useMemo(
    () => shipments.find((shipment) => shipment.parcel_id === id) || null,
    [shipments, id]
  );

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch, id]);

  useEffect(() => {
    if (!error) return;
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: error,
      confirmButtonText: "Retry",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(fetchShipments());
      }
    });
  }, [error, dispatch]);

  useEffect(() => {
    if (shipments.length && !currentShipment) {
      Swal.fire({
        title: "Parcel Not Found",
        text: "No parcel with the given ID. Please create one!",
        icon: "error",
      }).then(() => navigate("/admin_dashboard", { replace: true }));
    }
  }, [shipments, currentShipment, navigate]);

  async function handleActionClick(action: string) {
    if (action === "Delete Parcel" && id) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await dispatch(deleteShipmentById(id));
        await Swal.fire("Deleted!", "Parcel deleted successfully", "success");
        navigate("/admin-dashboard", { replace: true });
      }
    }

    if (action === "Edit Parcel" && id) {
      navigate(`/parcel/${id}/edit`);
    }
  }

  async function handleActionForTracking(action: string, transportId: string) {
    if (action === "DELETE") {
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You're about to delete tracking details",
        showCancelButton: true,
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        await dispatch(deleteTransistById(transportId));
        await dispatch(fetchShipments());
      }
    }
  }

  function openModel(action: "Edit" | "Add", event: ITransportHistory) {
    setIsTrackingEditorOpen(true);
    setModelData({
      transportData: action === "Add" ? event : null,
      type: action,
    });
  }

  if (loading || !currentShipment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#232110]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#f9e106] animate-pulse" />
          <p className="text-white font-semibold">Loading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#232110] font-[Space Grotesk, Noto Sans, sans-serif] text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#4a4621] px-10 py-3">
        <div className="flex items-center gap-4">
          <svg className="h-4 w-4" viewBox="0 0 48 48" fill="currentColor">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" />
          </svg>
          <h2 className="text-lg font-bold tracking-tight">
            United parcel services
          </h2>
        </div>
        <nav>
          <Link
            to="/admin-dashboard"
            className="text-sm font-medium hover:text-[#ccc68e]"
          >
            Dashboard
          </Link>
        </nav>
      </header>

      {/* Content */}
      <main className="flex flex-1 justify-center px-40 py-5">
        <div className="flex max-w-[960px] flex-1 flex-col">
          {/* Breadcrumb */}
          <div className="flex gap-2 p-4 text-[#ccc68e]">
            <a href="#">Admin Dashboard</a>
            <span>/</span>
            <span className="text-white">Parcel Details</span>
          </div>

          {/* Title + Back */}
          <div className="flex flex-wrap items-center justify-between p-4">
            <h1 className="text-3xl font-bold">
              Parcel Details / {currentShipment.package_name}
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="h-8 rounded-full bg-[#4a4621] px-4 text-sm hover:bg-[#5a5531]"
            >
              Back
            </button>
          </div>

          {/* Image + Info */}
          <div className="p-4 flex flex-col xl:flex-row gap-4">
            <div
              className="w-full rounded-xl bg-cover bg-center aspect-video"
              style={{ backgroundImage: `url('${currentShipment.img_url}')` }}
            />
            <div className="min-w-72 flex flex-col gap-1 py-4 xl:px-4">
              <p className="text-lg font-bold">
                Parcel #{currentShipment.parcel_id}
              </p>
              <p className="text-base text-[#ccc68e]">
                Quantity: {currentShipment.quantity} | Package Name:{" "}
                {currentShipment.package_name}
              </p>
            </div>
          </div>

          {/* Details */}
          <h2 className="px-4 pt-5 pb-3 text-[22px] font-bold">Details</h2>
          <div className="grid grid-cols-[20%_1fr] gap-x-6 p-4">
            {[
              { label: "Origin", value: currentShipment.origin },
              { label: "Destination", value: currentShipment.destination },
              { label: "Status", value: currentShipment.status },
              { label: "Pickup date", value: currentShipment.pickup_date },
              {
                label: "Estimated delivery date",
                value: currentShipment.delivery_date,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="col-span-2 grid grid-cols-subgrid border-t border-[#6a642f] py-5"
              >
                <p className="text-sm text-[#ccc68e]">{label}</p>
                <p className="text-sm">{value}</p>
              </div>
            ))}
          </div>

          {/* Tracking History */}
          <h2 className="px-4 pt-5 pb-3 text-[22px] font-bold">
            Tracking History
          </h2>
          <div className="grid grid-cols-[40px_1fr_1fr] gap-x-6 px-4">
            {currentShipment.transport_history?.map((event) => (
              <React.Fragment key={event.transport_id}>
                <div className="flex flex-col items-center gap-1 pt-3">
                  {currentShipment.transport_history &&
                  event === currentShipment?.transport_history[0] ? (
                    <Package />
                  ) : currentShipment.transport_history &&
                    event ===
                      currentShipment?.transport_history.slice(-1)[0] ? (
                    <Check />
                  ) : (
                    <Truck />
                  )}
                  <div className="w-[1.5px] grow bg-[#6a642f]" />
                </div>
                <div className="flex flex-1 flex-col py-3">
                  <p className="text-sm font-medium">
                    {event.current_location}
                  </p>
                  <p className="text-sm text-[#ccc68e]">{event.current_date}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => openModel("Add", event)}
                    className="bg-[#4a4621] hover:bg-[#5a5531] text-xs md:text-sm"
                  >
                    Add
                  </Button>
                  <Button
                    onClick={() => openModel("Edit", event)}
                    className="bg-[#4a4621] hover:bg-[#5a5531] text-xs md:text-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      handleActionForTracking("DELETE", event.transport_id!)
                    }
                    className="bg-[#4a4621] hover:bg-[#5a5531] text-xs md:text-sm"
                  >
                    Delete
                  </Button>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 px-4 py-3">
            {["Edit Parcel", "Delete Parcel"].map((action) => (
              <Button
                key={action}
                onClick={() => handleActionClick(action)}
                className="h-10 rounded-full bg-[#4a4621] px-4 text-sm font-bold hover:bg-[#5a5531]"
              >
                {action}
              </Button>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isTrackingEditorOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-stone-700 bg-opacity-50 z-50">
          <div className="w-[90%] md:w-1/2 h-[90%] bg-[#232110] rounded-lg">
            <header className="flex justify-between items-center border-b border-[#f9e106] py-3 px-4">
              <h2 className="text-lg font-bold">{modelData.type} Tracking</h2>
              <Button
                onClick={() => setIsTrackingEditorOpen(false)}
                className="bg-[#f9e106] text-black"
              >
                Close
              </Button>
            </header>
            <TrackingForm
              event={modelData.transportData ?? ({} as ITransportHistory)}
              type={modelData.type}
              onClose={() => setIsTrackingEditorOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ParcelDetails;
