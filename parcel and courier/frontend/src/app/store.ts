import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "@/features/shipmentSlice";
import userReducer from "@/features/userSlice";
import changeReducer from "@/features/transitStatusSlice";

export const store = configureStore({
  reducer: {
    shipment: shipmentReducer,
    user: userReducer,
    transit: changeReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
