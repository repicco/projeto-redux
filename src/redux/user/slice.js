import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: [],
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {
      const { name, email } = action.payload;

      return {
        ...state,
        user: {
          name,
          email,
          address: null,
        },
      };
    },
    logoutUser: (state) => {
      return { ...state, user: null };
    },
    addAddress: (state, action) => {
      const { location, number } = action.payload;

      if (state.user === null) {
        alert("Necessario logar com um usuário");

        return { ...state };
      }

      if (location === "" || number === "") {
        alert("Preencha todos os campos");

        return { ...state };
      }

      alert("Dados atualizados");
      return {
        ...state,
        user: {
          ...state.user,
          address: {
            location,
            number,
          },
        },
      };
    },
    deleteAddress: (state) => {
      return {
        ...state,
        user: {
          ...state.user,
          address: null,
        },
      };
    },
    fetchUsers: (state) => {
      state.loading = true;
      console.log("Call fetchUsers");
    },
    fetchUsersSuccess: (state, action) => {
      console.log("Success", action.payload);

      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFailure: (state, action) => {
      console.log("Failure", action.payload);

      state.loading = false;
    },
    fetchUserById: (state) => {
      console.log("call FetchUserById");
    },
    fetchUserByIdSuccess: (state, action) => {
      console.log("Success", action.payload);
    },
    fetchUserByIdFailure: (state) => {
      console.log("Failure");
    },
  },
});

export const {
  createUser,
  logoutUser,
  addAddress,
  deleteAddress,
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserById,
  fetchUserByIdFailure,
  fetchUserByIdSuccess,
} = userSlice.actions;

export default userSlice.reducer;
