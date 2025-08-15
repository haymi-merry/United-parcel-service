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
  async function transactionDetailAction(formData: FormData) {
    const currentLocation = formData.get("currentLocation") as string;
    const currentDate = formData.get("currentDate") as string;
    const transportId = formData.get("transport_id") as string;

    if (type === "Edit" && transportId && currentLocation && currentDate) {
      await dispatch(
        updateTransitHistory({
          transport_id: transportId,
          current_location: currentLocation,
          current_date: currentDate,
          current_time: new Date().toLocaleTimeString(),
          parcel_id: event.parcel_id,
        })
      );
      await dispatch(fetchShipments());
      onClose();
      return;
    }

    if (type === "Add" && transportId && currentLocation && currentDate) {
      await dispatch(
        addTransitHistory({
          current_location: currentLocation,
          current_date: currentDate,
          current_time: new Date().toLocaleTimeString(),
          parcel_id: event.parcel_id,
        })
      );
      await dispatch(fetchShipments());
      onClose();
      return;
    }
  }

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
      showConfirmButton: true,
      confirmButtonText: "Retry",
    }).then(() => {});
  }

  return (
    <div>
      <form action={transactionDetailAction}>
        <div className="flex items-center justify-center gap-x-3">
          <div className="flex flex-col justify-start gap-y-2">
            <label htmlFor="currentLocation">Current Location</label>
            <Input
              className="w-full rounded-lg  border-[#f9e106] border-1  text-sm p-[15px]  font-normal focus:outline-none  placeholder:text-[#bbba9b]"
              id="currentLocation"
              defaultValue={
                type === "Edit" ? event.current_location : undefined
              }
              type="text"
              name="currentLocation"
            />
          </div>
          <div className="flex flex-col justify-start gap-y-2">
            <label htmlFor="currentDate">Current Date</label>
            <Input
              className="w-full rounded-lg  p-[15px] text-sm  font-normal focus:outline-none border-[#f9e106] border-1 placeholder:text-[#bbba9b]"
              id="currentDate"
              defaultValue={type === "Edit" ? event.current_date : undefined}
              type="date"
              name="currentDate"
            />
          </div>
        </div>
        <Input type="hidden" value={event.transport_id} name="transport_id" />
        <div className="w-full mt-10  flex items-center justify-center">
          <Button
            type="submit"
            className="px-15 rounded-md text-sm font-bold text-center tracking-tigh border-[#f9e106] border-1"
          >
            {loading ? type + "ing" : type}
          </Button>
        </div>
      </form>
    </div>
  );
}
