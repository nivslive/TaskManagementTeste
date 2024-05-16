import { configureStore } from '@reduxjs/toolkit';
import dashboard from './dashboard-slice';
import auth from './auth-slice';
import error from './error-handler-slice';

const store = configureStore({
  reducer: {
    dashboard,
    auth,
    error,
  },
})

export default store;