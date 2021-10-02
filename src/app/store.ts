import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'; 
import formReducer from '../features/form/formSlice';
import appReducer from '../features/app/appSlice';

export const store = configureStore({
  reducer: { 
    form: formReducer,
    app: appReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
