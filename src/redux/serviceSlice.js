// import {
//   createAsyncThunk,
//   createSlice,
// } from "@reduxjs/toolkit";

// import api from "../api/axios";

// // GET SERVICES
// export const fetchServices = createAsyncThunk(
//   "services/fetchServices",
//   async () => {
//     const response = await api.get("/services");
//     return response.data;
//   }
// );

// // ADD SERVICE
// export const addService = createAsyncThunk(
//   "services/addService",
//   async (serviceData) => {
//     const response = await api.post(
//       "/services",
//       serviceData
//     );

//     return response.data;
//   }
// );

// // DELETE SERVICE
// export const deleteService = createAsyncThunk(
//   "services/deleteService",
//   async (id) => {
//     await api.delete(`/services/${id}`);
//     return id;
//   }
// );

// const serviceSlice = createSlice({
//   name: "services",

//   initialState: {
//     items: [],
//     selectedService: null,
//     loading: false,
//     error: null,
//   },

//   reducers: {
//     selectService: (state, action) => {
//       state.selectedService = action.payload;
//     },

//     clearSelectedService: (state) => {
//       state.selectedService = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       // FETCH SERVICES
//       .addCase(
//         fetchServices.pending,
//         (state) => {
//           state.loading = true;
//         }
//       )

//       .addCase(
//         fetchServices.fulfilled,
//         (state, action) => {
//           state.loading = false;
//           state.items = action.payload;
//         }
//       )

//       .addCase(
//         fetchServices.rejected,
//         (state, action) => {
//           state.loading = false;
//           state.error = action.error.message;
//         }
//       )

//       // ADD SERVICE
//       .addCase(
//         addService.fulfilled,
//         (state, action) => {
//           state.items.push(action.payload);
//         }
//       )

//       // DELETE SERVICE
//       .addCase(
//         deleteService.fulfilled,
//         (state, action) => {
//           state.items = state.items.filter(
//             (service) =>
//               service.id !== action.payload
//           );
//         }
//       );
//   },
// });

// export const {
//   selectService,
//   clearSelectedService,
// } = serviceSlice.actions;

// export default serviceSlice.reducer;
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../api/axios";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/services");

      console.log("Services from API:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
        error.message ||
        "Failed to load services"
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "services",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload;

        console.log(
          "Redux services:",
          action.payload
        );
      })

      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          "Unable to fetch services";
      });
  },
});

export default serviceSlice.reducer;