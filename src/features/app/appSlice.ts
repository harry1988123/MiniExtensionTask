import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState, RootState } from '../../../types'

export const slice = createSlice({
    name: 'app',
    initialState: {
        user: '',
        error: '',
        data: {},
        loggedIn: false,
        loading: false
    } as AppState,
    reducers: {
        setError: (state, action: PayloadAction<AppState['error']>) => {
            state.error = action.payload;
        },
        setUser: (state, action: PayloadAction<AppState['user']>) => {
            state.user = action.payload;
        },
        setData: (state, action: PayloadAction<AppState['data']>) => {
            state.data = action.payload;
        },
        setLoading: (state, action: PayloadAction<AppState['loading']>) => {
            state.loading = action.payload;
        },
        setLoggedIn: (state, action: PayloadAction<AppState['loggedIn']>) => {
            state.loggedIn = action.payload;
        }
    }
});

export const { setError, setUser, setData, setLoading, setLoggedIn } = slice.actions;

export const selectError = (state: RootState) => state.app.error;

export const selectUser = (state: RootState) => state.app.user;

export const selectData = (state: RootState) => state.app.data;

export const selectLoading = (state: RootState) => state.app.loading;

export const selectLoggedIn = (state: RootState) => state.app.loggedIn;

export default slice.reducer;
