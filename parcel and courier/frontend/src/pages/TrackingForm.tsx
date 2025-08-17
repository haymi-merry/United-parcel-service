import { useCallback, useEffect } from "react";
import type { TAppDispatch, TRootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchShipments } from "@/features/shipmentSlice";
import {
  addTransitHistory,
  updateTransitHistory,
} from "@/features/transitStatusSlice";
import type { ITransportHistory } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function TrackingForm({
  event,
  type,
  onClose,
}: {
  event: ITransportHistory;
  type: "Edit" | "Add";
  onClose: () => void;
}) {
  const dispatch = useDispatch<TAppDispatch>();
  const { error, loading } = useSelector((state: TRootState) => state.transit);

  // 🔹 SweetAlert wrapper for consistent UI
  const showAlert = (
    icon: "error" | "warning",
    title: string,
    text: string,
    confirmText = "OK"
  ) => {
    Swal.fire({
      icon,
      title,
      text,
      confirmButtonText: confirmText,
      customClass: {
        popup:
          "rounded-2xl shadow-xl bg-white dark:bg-gray-900 max-w-sm sm:max-w-md",
        title: "text-lg font-semibold text-gray-900 dark:text-white",
        htmlContainer: "text-sm text-gray-600 dark:text-gray-300",
        confirmButton:
          "bg-[#f9e106] text-gray-900 font-bold px-4 py-2 rounded-xl hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-300",
      },
      buttonsStyling: false,
    });
  };

  // 🔹 Show error alert only when error changes
  useEffect(() => {
    if (error) {
      showAlert("error", "Oops...", error, "Retry");
    }
  }, [error]);

  const transactionDetailAction = useCallback(
    async (formData: FormData) => {
      const currentLocation = (
        formData.get("currentLocation") as string
      )?.trim();
      const currentDate = formData.get("currentDate") as string;
      const currentCountry = (formData.get("currentCountry") as string)?.trim();
      const transportId = formData.get("transport_id") as string;

      if (!currentLocation || !currentDate || !currentCountry) {
        showAlert(
          "warning",
          "Missing Fields",
          "Please fill in all fields before submitting."
        );
        return;
      }

      const payload = {
        transport_id: transportId,
        current_location: currentLocation,
        current_date: currentDate,
        current_time: new Date().toLocaleTimeString(),
        parcel_id: event.parcel_id,
        current_country: currentCountry,
      };

      if (type === "Edit") {
        await dispatch(updateTransitHistory(payload));
      } else {
        await dispatch(addTransitHistory(payload));
      }

      await dispatch(fetchShipments());
      onClose();
    },
    [dispatch, event.parcel_id, onClose, type]
  );

  const inputStyles =
    "w-full rounded-lg p-[15px] text-sm font-normal focus:outline-none border-[#f9e106] border-1 placeholder:text-[#bbba9b]";

  return (
    <div className="w-full px-4 sm:px-6 md:px-10">
      <form action={transactionDetailAction} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[90%]">
          {/* Current Location */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="currentLocation" className="text-sm font-medium">
              Current Location
            </label>
            <Input
              className={inputStyles}
              id="currentLocation"
              name="currentLocation"
              type="text"
              placeholder="e.g Addis Ababa"
              defaultValue={type === "Edit" ? event.current_location : ""}
            />
          </div>

          {/* Current Country */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="currentCountry" className="text-sm font-medium">
              Current Country
            </label>
            <Input
              className={inputStyles}
              id="currentCountry"
              name="currentCountry"
              type="text"
              placeholder="e.g Ethiopia"
              defaultValue={type === "Edit" ? event.current_country : ""}
            />
          </div>

          {/* Current Date */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="currentDate" className="text-sm font-medium">
              Current Date
            </label>
            <Input
              className={inputStyles}
              id="currentDate"
              name="currentDate"
              type="date"
              defaultValue={type === "Edit" ? event.current_date : ""}
            />
          </div>
        </div>

        {/* Hidden Transport ID */}
        <Input type="hidden" value={event.transport_id} name="transport_id" />

        {/* Submit Button */}
        <div className="w-full mt-10 flex justify-center">
          <Button
            type="submit"
            className="px-6 py-2 rounded-md text-sm font-bold tracking-tight border-[#f9e106] border-1"
            disabled={loading}
          >
            {loading ? `${type}ing...` : type}
          </Button>
        </div>
      </form>
    </div>
  );
}
