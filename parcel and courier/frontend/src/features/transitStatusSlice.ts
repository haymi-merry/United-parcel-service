import type { ITransportHistory } from "@/lib/types";
import { supabase } from "@/supabase/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  loading: boolean;
  error: string | null;
  transitHistory: ITransportHistory[];
};

const initialState: TInitialState = {
  error: null,
  loading: false,
  transitHistory: [],
};

export const fetchTransitHistory = createAsyncThunk(
  "status/getStatus",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("transport_history")
      .select("*");
    if (error) {
      return rejectWithValue(error.message);
    }
    return data;
  }
);

export const addTransitHistory = createAsyncThunk(
  "status/addStatus",
  async (newStatus: ITransportHistory, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("transport_history")
      .insert(newStatus)
      .select("*");
    if (error) {
      return rejectWithValue(error.message);
    }

    if (!data || data.length === 0) {
      return rejectWithValue("Failed to add new status");
    }
    return data[0];
  }
);

export const updateTransitHistory = createAsyncThunk(
  "status/updateStatus",
  async (updatedStatus: ITransportHistory, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("transport_history")
      .update(updatedStatus)
      .eq("transport_id", updatedStatus.transport_id);
    if (error) {
      return rejectWithValue(error.message);
    }
    return data;
  }
);

export const deleteTransistById = createAsyncThunk(
  "status/deleteStatus",
  async (id: string, { rejectWithValue }) => {
    const { error } = await supabase
      .from("transport_history")
      .delete()
      .eq("transport_id", id);
    if (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

const changeCurrentStatusSlice = createSlice({
  name: "changeCurrentStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransitHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransitHistory.fulfilled, (state, { payload }) => {
        state.transitHistory = payload;
        state.loading = false;
      })
      .addCase(fetchTransitHistory.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.loading = false;
      })
      .addCase(deleteTransistById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransistById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.transitHistory = state.transitHistory.filter(
          (item) => item.transport_id !== payload
        );
      })
      .addCase(deleteTransistById.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.loading = false;
      })
      .addCase(addTransitHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTransitHistory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.transitHistory.push(payload);
      })
      .addCase(addTransitHistory.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.loading = false;
      });
  },
});

export default changeCurrentStatusSlice.reducer;
