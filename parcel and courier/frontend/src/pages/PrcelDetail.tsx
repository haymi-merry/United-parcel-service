import React, { useEffect, useState } from "react";
import { Package, Truck, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { TAppDispatch, TRootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteShipmentById, fetchShipments } from "@/features/shipmentSlice";
import type { IShipment, ITransportHistory } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import TrackingForm from "./TrackingForm";
import { deleteTransistById } from "@/features/transitStatusSlice";

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
    type: "Edit",
  });
  const {
    shipment: shipments,
    loading,
    error,
  } = useSelector((state: TRootState) => state.shipment);

  function handleActionClick(action: string) {
    if (action === "Delete Parcel" && id) {
      Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteShipmentById(id));
          (async () => {
            await Swal.fire({
              title: "Success",
              text: "Parcel deleted successfully",
              icon: "success",
            });
            navigate(`/parcel/${id}`, { replace: true });
          })();
        }
      });
    } else {
      navigate(`/parcel/${id}/edit`);
    }
  }

  function handleActionForTracking(action: string, tranport_id: string) {
    if (action === "DELETE") {
      Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You're about to delete tracking details",
        showConfirmButton: true,
        confirmButtonText: "Delete",
        showCancelButton: true,
      }).then(async (result) => {
        if (!result.isConfirmed) return;
        await dispatch(deleteTransistById(tranport_id));
        await dispatch(fetchShipments());
      });
    }
  }

  const [currentShipment, setCurrentShipment] = useState<IShipment | null>(
    shipments.find((shipment) => shipment.parcel_id === id) || null
  );

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch, id]);

  useEffect(() => {
    const found = shipments.find((shipment) => shipment.parcel_id === id);
    if (!found && shipments && shipments.length > 0) {
      Swal.fire({
        title: "Parcel Not Found",
        text: "There is no parcel with the given ID. Please create one!",
        icon: "error",
      }).then(() => {
        navigate(`/admin_dashboard`, { replace: true });
      });
      return;
    }
    setCurrentShipment(found!);
  }, [id, shipments, navigate]);

  function openModel(action: string, event: ITransportHistory) {
    if (action === "EDIT" && event.transport_id) {
      setIsTrackingEditorOpen(true);
      setModelData({
        transportData: event,
        type: "Edit",
      });
      return;
    }
    if (action === "ADD" && event.transport_id) {
      setIsTrackingEditorOpen(true);
      setModelData({
        transportData: event,
        type: "Add",
      });
    }
  }

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: error,
      showConfirmButton: true,
      confirmButtonText: "Retry",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(fetchShipments());
      }
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
      <header className="flex items-center justify-between border-b border-[#4a4621] px-10 py-3">
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
            United parcel services
          </h2>
        </div>
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-9">
            {["Dashboard"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium hover:text-[#ccc68e]"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex flex-1 justify-center px-40 py-5">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <div className="flex flex-wrap gap-2 p-4">
            <a href="#" className="text-base font-medium text-[#ccc68e]">
              Admin Dashboard
            </a>
            <span className="text-base font-medium text-[#ccc68e]">/</span>
            <span className="text-base font-medium">Parcel Details</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 p-4">
            <h1 className="min-w-72 text-3xl font-bold tracking-tight">
              Parcel Details / {currentShipment?.package_name}
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="h-8 rounded-full bg-[#4a4621] px-4 text-sm font-medium hover:bg-[#5a5531]"
            >
              Back
            </button>
          </div>

          <div className="p-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
              <div
                className="w-full rounded-xl bg-cover bg-center"
                style={{
                  backgroundImage: `url('${currentShipment?.img_url}')`,
                  aspectRatio: "16/9",
                }}
              />
              <div className="flex min-w-72 grow flex-col gap-1 py-4 xl:px-4">
                <p className="text-lg font-bold tracking-tight">
                  Parcel #{currentShipment?.parcel_id}
                </p>
                <p className="text-base text-[#ccc68e]">
                  Quantity: {currentShipment?.quantity} | Package Name:{" "}
                  {currentShipment?.package_name}
                </p>
              </div>
            </div>
          </div>

          <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold tracking-tight">
            Details
          </h2>
          <div className="grid grid-cols-[20%_1fr] gap-x-6 p-4">
            {[
              { label: "Origin", value: currentShipment?.origin },
              { label: "Destination", value: currentShipment?.destination },
              { label: "Status", value: currentShipment?.status },
              { label: "Pickup date", value: currentShipment?.pickup_date },
              {
                label: "Estimated delivery date",
                value: currentShipment?.delivery_date,
              },
            ].map((detail, index) => (
              <div
                key={index}
                className="col-span-2 grid grid-cols-subgrid border-t border-[#6a642f] py-5"
              >
                <p className="text-sm text-[#ccc68e]">{detail.label}</p>
                <p className="text-sm">{detail.value}</p>
              </div>
            ))}
          </div>

          <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold tracking-tight">
            Tracking History
          </h2>

          <div className="grid   grid-cols-[40px_1fr_1fr]  gap-x-6 px-4">
            {currentShipment?.transport_history?.map((event, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center gap-1 pt-3">
                  {index === 0 && currentShipment.transport_history ? (
                    <i className="h-6 w-6">
                      <Package />
                    </i>
                  ) : currentShipment.transport_history &&
                    index === currentShipment?.transport_history?.length - 1 ? (
                    <i className="h-4 w-4 md:h-6 md:w-6">
                      <Check />
                    </i>
                  ) : (
                    <i className="h-4 w-4 md:h-6 md:w-6">
                      <Truck />
                    </i>
                  )}
                  {currentShipment?.transport_history &&
                    index < currentShipment?.transport_history.length - 1 && (
                      <div className="w-[1.5px] grow bg-[#6a642f] h-2" />
                    )}
                </div>

                <div className="flex flex-1 flex-col py-3 ">
                  <p className="text-sm md:text-base font-medium">
                    {event.current_location}
                  </p>
                  <p className="text-sm md:text-base text-[#ccc68e]">
                    {event.current_date}
                  </p>
                </div>

                <div className="flex gap-x-2">
                  <Button
                    className="bg-[#4a4621] text-[11px] md:text-sm text-white hover:bg-[#5a5531]"
                    onClick={() => openModel("ADD", event)}
                  >
                    Add
                  </Button>
                  <Button
                    className="bg-[#4a4621] text-[11px] md:text-sm text-white hover:bg-[#5a5531]"
                    onClick={() => openModel("EDIT", event)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-[#4a4621] text-[11px] md:text-sm text-white hover:bg-[#5a5531]"
                    onClick={() =>
                      handleActionForTracking("DELETE", event.transport_id!)
                    }
                  >
                    Delete
                  </Button>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 px-4 py-3">
            {["Edit Parcel", "Delete Parcel"].map((action) => (
              <Button
                key={action}
                onClick={() => handleActionClick(action)}
                className="h-10 rounded-full bg-[#4a4621] px-4 text-sm font-bold tracking-tight hover:bg-[#5a5531]"
              >
                {action}
              </Button>
            ))}
          </div>
        </div>
      </main>
      {isTrackingEditorOpen && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-700 bg-opacity-50  items-center justify-center z-50 md:w-1/2 w-[90%] h-[90%]">
          <header className="border-b-1 w-full border-[#f9e106] mb-3 py-3 px-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">{modelData.type} Tracking</h2>
            <Button
              onClick={() => setIsTrackingEditorOpen(false)}
              className=" bg-[#f9e106] text-white hover:border-1 border-[#f9e106] "
            >
              Close
            </Button>
          </header>
          <TrackingForm
            event={modelData.transportData! as ITransportHistory}
            type={modelData.type}
            onClose={() => setIsTrackingEditorOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ParcelDetails;
