import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Roles, UserData } from "../pages/register/Register.api";

export const initialUser: UserData = {
    id: 0,
    username: '',
    fullName: '',
    address: '',
    email: '',
    role: Roles.Default
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUser,
    reducers: {
        saveUser: (state, action: PayloadAction<UserData>) => {
            state = action.payload;
            return state;
        }
    }
})

export const { saveUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer

