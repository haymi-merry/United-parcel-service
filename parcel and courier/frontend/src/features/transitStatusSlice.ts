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
      });
  },
});

export default changeCurrentStatusSlice.reducer;
