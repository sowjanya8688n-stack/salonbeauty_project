import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";

import api from "../api/axios";


// ===============================
// FETCH ALL BOOKINGS
// ===============================

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",

  async () => {
    const response = await api.get("/bookings");

    return response.data;
  }
);


// ===============================
// CREATE BOOKING
// ===============================

export const createBooking = createAsyncThunk(
  "bookings/createBooking",

  async (booking) => {
    const response = await api.post(
      "/bookings",
      booking
    );

    return response.data;
  }
);


// ===============================
// UPDATE BOOKING
// ===============================

export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",

  async ({ id, data }) => {
    const response = await api.patch(
      `/bookings/${id}`,
      data
    );

    return response.data;
  }
);


// ===============================
// DELETE BOOKING
// ===============================

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",

  async (id) => {
    await api.delete(
      `/bookings/${id}`
    );

    return id;
  }
);


// ===============================
// BOOKING SLICE
// ===============================

const bookingSlice = createSlice({

  name: "bookings",

  initialState: {

    items: [],

    status: "idle",

    error: null

  },

  reducers: {},

  extraReducers: (builder) => {

    // FETCH BOOKINGS

    builder.addCase(
      fetchBookings.pending,
      (state) => {

        state.status = "loading";

      }
    );


    builder.addCase(
      fetchBookings.fulfilled,
      (state, action) => {

        state.status = "succeeded";

        state.items = action.payload;

      }
    );


    builder.addCase(
      fetchBookings.rejected,
      (state, action) => {

        state.status = "failed";

        state.error =
          action.error.message;

      }
    );


    // CREATE BOOKING

    builder.addCase(
      createBooking.fulfilled,
      (state, action) => {

        state.items.push(
          action.payload
        );

      }
    );


    // UPDATE BOOKING

    builder.addCase(
      updateBooking.fulfilled,
      (state, action) => {

        const index =
          state.items.findIndex(
            (booking) =>
              String(booking.id) ===
              String(action.payload.id)
          );

        if (index !== -1) {

          state.items[index] =
            action.payload;

        }

      }
    );


    // DELETE BOOKING

    builder.addCase(
      deleteBooking.fulfilled,
      (state, action) => {

        state.items =
          state.items.filter(
            (booking) =>
              String(booking.id) !==
              String(action.payload)
          );

      }
    );

  }

});


export default bookingSlice.reducer;