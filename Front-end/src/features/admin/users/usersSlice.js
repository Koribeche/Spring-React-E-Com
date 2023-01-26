import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filtre: { name: "", role: "", sortBy: "DESC", orderBy: "idUser", page: 0 },
  nbrPages: 1,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.filtre = {
        name: "",
        role: "",
        sortBy: "DESC",
        orderBy: "idUser",
        page: 0,
      };
    },

    setFiltre: (state, action) => {
      state.filtre = { ...state.filtre, ...action.payload };
    },

    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.nbrPages = action.payload.nbrPages;
    },

    addUsers: (state, action) => {
      state.users.unshift(action.payload);
    },

    removeUsers: (state, action) => {
      state.users = state.users.filter((elt) => elt.idUser !== action.payload);
    },

    updateUsers: (state, action) => {
      const tmp = state.users.filter(
        (elt) => elt.idUser !== action.payload.idUser
      );
      tmp.unshift(action.payload);
      state.users = tmp;
    },
  },
});

export const {
  setUsers,
  setFiltre,
  reset,
  addUsers,
  removeUsers,
  updateUsers,
} = usersSlice.actions;
export default usersSlice.reducer;
