import { createSlice } from '@reduxjs/toolkit'


interface IIntialState {
    authenticated: boolean,
    token: any,
}

const initialState: IIntialState = {
  authenticated: false,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(state, action) {
      state.authenticated = true;
      state.token = action.payload.token;
    },
    logout(state, action) {
      state.authenticated = false;
      state.token = null;
    } 
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer