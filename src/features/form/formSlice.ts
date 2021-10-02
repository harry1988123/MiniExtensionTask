import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, FormState } from "../../../types";

export const slice = createSlice({
    name: 'form',
    initialState: {
        value: ''
    },
    reducers: {
        setValue: (state, action: PayloadAction<FormState['value']>) => {
            state.value = action.payload;
        }
    }
});

export const { setValue } = slice.actions;
export const selectValue = (state: RootState) => state.form.value;
export default slice.reducer;
