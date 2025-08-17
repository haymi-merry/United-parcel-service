// supabaseRealtime.ts
import {
  insertSyncRequest,
  removeSyncRequest,
  updateSyncRequest,
} from "@/features/changeAddressSlice";
import { supabase } from "./supabase";
import { type TAppDispatch } from "@/app/store";

export const initRealtime = (dispatch: TAppDispatch) => {
  const channel = supabase.channel("address_change_request");

  // INSERT
  channel.on("broadcast", { event: "INSERT" }, ({ payload }) => {
    console.log(payload);
    dispatch(insertSyncRequest(payload));
  });

  // UPDATE
  channel.on("broadcast", { event: "UPDATE" }, ({ payload }) => {
    dispatch(updateSyncRequest(payload));
  });

  // DELETE
  channel.on("broadcast", { event: "DELETE" }, ({ payload }) => {
    dispatch(removeSyncRequest(payload.parcel_id));
  });

  channel.subscribe();

  return channel;
};

// Helper to send broadcasts
export const sendRealtimeEvent = (
  event: "INSERT" | "UPDATE" | "DELETE",
  data: unknown
) => {
  supabase.channel("address_change_request").send({
    type: "broadcast",
    event,
    payload: data,
  });
};
