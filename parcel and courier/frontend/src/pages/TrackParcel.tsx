import type { TAppDispatch, TRootState } from "@/app/store";
import Form from "@/components/Form";
import { fetchShipments } from "@/features/shipmentSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TrackIDInput() {
  const [parcelID, setParcelID] = useState<string | undefined>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<TAppDispatch>();
  const { shipment } = useSelector((state: TRootState) => state.shipment);

  useEffect(() => {
    if (!shipment || shipment.length < 1) dispatch(fetchShipments());
  }, [dispatch, shipment]);
  useEffect(() => {
    if (parcelID === "admin") {
      Swal.fire({
        title: "Redirecting...",
        text: "You are being redirected to the admin login page.",
        icon: "info",
        timer: 1000,
        background: "#232110",
        color: "#bbba9b",
        showConfirmButton: false,
      }).then(() => {
        navigate("/admin-login");
      });
    }
  }, [navigate, parcelID]);

  function track(id: string) {
    if (!id) return;
    const found = shipment.find((s) => s.parcel_id === id);
    if (!found) {
      Swal.fire({
        icon: "error",
        title: "Not Found",
        text: "No shipment found with the provided ID.",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Found",
      text: `Shipment found: ${found.parcel_id}`,
    });

    navigate(`/shipment-tracking/${id}`);
  }
  return (
    <Form
      forWhich="parcel_tracking"
      onContinue={() => track(parcelID!)}
      setParcelID={setParcelID}
      parcelID={parcelID}
    />
  );
}
