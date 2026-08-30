// import { configureStore } from "@reduxjs/toolkit";

// import userReducer from "./userSlice";
// import serviceReducer from "./serviceSlice";
// import bookingReducer from "./bookingSlice";

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     services: serviceReducer,
//     bookings: bookingReducer
//   }
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";

import serviceReducer from "./serviceSlice";
import bookingReducer from "./bookingSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    services: serviceReducer,
    bookings: bookingReducer,
    users: userReducer,
  },
});

export default store;