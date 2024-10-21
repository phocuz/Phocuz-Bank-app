import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalId: "",
    createdAt: "",
};

const customerSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        createAccount: {
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalId = action.payload.nationalId;
                state.createdAt = action.payload.createdAt;
            },
            prepare(fullName, nationalId) {
                return {
                    payload: {
                        fullName,
                        nationalId,
                        createdAt: new Date().toISOString(),
                    },
                };
            },
        },
        updateName(state, action) {
            state.fullName = action.payload;
        },
    },
});

export const { createAccount, updateName } = customerSlice.actions;
export default customerSlice.reducer;
