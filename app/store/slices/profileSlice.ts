import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Profile {
  name: string;
  email: string;
  dob: string;
  sex: string;
  addressCompany: string;
  addressHome: string;
}

interface ProfileState {
  data: Profile;
}

const initialState: ProfileState = {
  data: {
    name: "MR. USER",
    email: "user@gmail.com",
    dob: "01/01/2018",
    sex: "Male",
    addressCompany: "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi",
    addressHome: "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload;
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
