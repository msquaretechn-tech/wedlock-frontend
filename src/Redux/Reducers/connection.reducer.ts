import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
    connectionStatus : string;
    connectionType : string;
}

const initialState : InitialState = {
   connectionStatus : "",
   connectionType : "",
  };

const connectionSlice = createSlice({
  name: "connectionReducer",
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      const { connection_status, connectionType } = action.payload;
      state.connectionStatus = connection_status;
      state.connectionType = connectionType;
    },
    
  },
});

export const { setConnectionStatus } = connectionSlice.actions;
export default connectionSlice;