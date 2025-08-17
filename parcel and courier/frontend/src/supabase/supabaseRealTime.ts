// supabaseRealtime.ts
import {
  insertSyncRequest,
  removeSyncRequest,
  updateSyncRequest,
} from "@/features/changeAddressSlice";
import { supabase } from "./supabase";
import { store } from "@/app/store";

export const initRealtime = () => {
  const channel = supabase.channel("address_change_request");

  // INSERT
  channel.on("broadcast", { event: "INSERT" }, ({ payload }) => {
    store.dispatch(insertSyncRequest(payload));
  });

  // UPDATE
  channel.on("broadcast", { event: "UPDATE" }, ({ payload }) => {
    store.dispatch(updateSyncRequest(payload));
  });

  // DELETE
  channel.on("broadcast", { event: "DELETE" }, ({ payload }) => {
    store.dispatch(removeSyncRequest(payload.parcel_id));
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
