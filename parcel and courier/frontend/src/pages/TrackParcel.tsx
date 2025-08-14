import Form from "@/components/Form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TrackIDInput() {
  const [parcelID, setParcelID] = useState<string | undefined>("");
  const navigate = useNavigate();

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
  return (
    <Form
      forWhich="parcel_tracking"
      onContinue={() => {}}
      setParcelID={setParcelID}
      parcelID={parcelID}
    />
  );
}
