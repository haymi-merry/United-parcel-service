import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "@/features/shipmentSlice";
import userReducer from "@/features/userSlice";
import changeReducer from "@/features/transitStatusSlice";
import addressChangeSlice from "@/features/changeAddressSlice";
import customerSupportSlice from "@/features/customerSupportSlice";

export const store = configureStore({
  reducer: {
    shipment: shipmentReducer,
    user: userReducer,
    addressChange: addressChangeSlice,
    transit: changeReducer,
    customerSupport: customerSupportSlice,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
