import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

// FETCH USERS

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async () => {
    const response = await api.get("/users");
    return response.data;
  }
);

// DELETE USER

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id) => {
    await api.delete(`/users/${id}`);
    return id;
  }
);

// USER SLICE

const savedUser =
  localStorage.getItem("salonbeauty_user");

const userSlice = createSlice({
  name: "user",

  initialState: {
    currentUser: savedUser
      ? JSON.parse(savedUser)
      : null,

    users: [],

    status: "idle",

    error: null
  },

  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;

      localStorage.setItem(
        "salonbeauty_user",
        JSON.stringify(action.payload)
      );
    },

    logoutUser: (state) => {
      state.currentUser = null;

      localStorage.removeItem(
        "salonbeauty_user"
      );
    }
  },

  extraReducers: (builder) => {
    builder

      // FETCH USERS
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // DELETE USER
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) =>
            String(user.id) !==
            String(action.payload)
        );
      });
  }
});

export const {
  loginUser,
  logoutUser
} = userSlice.actions;

export default userSlice.reducer;