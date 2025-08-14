import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabase";
import type { IShipment } from "@/lib/types";

type TInitialState = {
  shipment: IShipment[];
  error: string | null;
  loading: boolean;
};

function formatTimeStampIntoTime(timestamp: number) {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const initialState: TInitialState = {
  shipment: [],
  error: null,
  loading: false,
};

export const createShipment = createAsyncThunk(
  "shipment/addShipment",
  async (shipmentData: IShipment, { rejectWithValue }) => {
    console.log("Creating shipment with data:", shipmentData);
    const { data, error } = await supabase
      .from("shipment")
      .insert(shipmentData)
      .select("*");

    if (data && data[0]?.length < 1) {
      return rejectWithValue("Failed to create shipment");
    }

    const { error: statusError } = await supabase
      .from("transport_history")
      .insert({
        parcel_id: data![0].parcel_id,
        current_location: data![0].origin,
        current_date: data![0].pickup_date,
        current_time: formatTimeStampIntoTime(data![0].created_at),
      });
    if (statusError || error) {
      console.error(statusError);
      return rejectWithValue("Failed to add shipment");
    }
    return data[0] as IShipment;
  }
);

export const deleteShipmentById = createAsyncThunk(
  "shipment/deleteShipmentById",
  async (id: string, { rejectWithValue }) => {
    const { error } = await supabase
      .from("shipment")
      .delete()
      .eq("parcel_id", id);
    if (error) {
      return rejectWithValue("Failed to delete shipment");
    }
    return id;
  }
);

export const updateShipmentById = createAsyncThunk(
  "shipment/updateShipmentById",
  async ({ id, shipmentData }: { id: string; shipmentData: IShipment }) => {
    const { data, error } = await supabase
      .from("shipment")
      .update(shipmentData)
      .eq("id", id);
    if (error) {
      throw new Error("Failed to update shipment");
    }
    return data;
  }
);

export const fetchShipments = createAsyncThunk(
  "shipment/fetchShipments",
  async () => {
    const { data, error } = await supabase.from("shipment").select(`
      *,
      transport_history (
        parcel_id,
        transport_id,
        current_location,
        current_date,
        current_time,
        icon
      )
    `);
    if (error) {
      console.log(error.message);
      throw new Error("Failed to fetch shipments");
    }
    return data;
  }
);

export const deleteAll = createAsyncThunk("shipment/deleteAll", async () => {
  const { data, error } = await supabase.from("shipment").delete();
  if (error) {
    throw new Error("Failed to delete all shipments");
  }
  return data;
});

const shipmentReducer = createSlice({
  name: "shipment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createShipment.pending, (state) => {
      state.loading = true;
    });
    builder
      .addCase(createShipment.fulfilled, (state, { payload }) => {
        state.shipment.push(payload);
        state.loading = false;
      })
      .addCase(createShipment.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.loading = false;
      })
      .addCase(fetchShipments.fulfilled, (state, { payload }) => {
        state.shipment = payload;
        state.loading = false;
      })
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShipments.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.loading = false;
      })
      .addCase(deleteShipmentById.fulfilled, (state, { payload }) => {
        state.shipment = state.shipment.filter(
          (item) => item.parcel_id !== payload
        );
      })
      .addCase(deleteShipmentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteShipmentById.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.loading = false;
      });
  },
});

export default shipmentReducer.reducer;
