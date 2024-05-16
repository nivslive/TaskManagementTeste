import { createSlice } from '@reduxjs/toolkit'


interface IIntialState {
    showErrorHandlerForDBReason: boolean,
}

const initialState: IIntialState = {
  showErrorHandlerForDBReason: false,
}

export const errorHandlerSlice = createSlice({
  name: 'errorHandler',
  initialState,
  reducers: {
    setShowErrorHandlerForDBReasonForTrue(state) {
        state.showErrorHandlerForDBReason = true;
    },
    setShowErrorHandlerForDBReasonForFalse(state) {
        state.showErrorHandlerForDBReason = false;
    }
  },
})

export const errorHandlerActions = errorHandlerSlice.actions

export default errorHandlerSlice.reducer