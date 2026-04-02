import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INotification {
    notificationId: string;
    title: string;
    message: string;
    body: IBody;
}



interface IBody {
    type:string,
    senderId:string,
    senderName: string,
    senderImage:string
}

interface InitialState {
    data: INotification | null;
    notifacations: INotification[] | null;
    notificationCount: number
}



const initialState: InitialState = {
    data:  null,
    notifacations: [],
    notificationCount: 0
};

export const notificationReducer = createSlice({
    name: "notificationReducer",
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<INotification[] | null>) => {
            state.notifacations = action.payload;
        },

        setsocketNotification: (state, action: PayloadAction<INotification | null>) => {
            if (action.payload) {
                state.data = action.payload;
                state.notifacations = state.notifacations ? [...state.notifacations, action.payload] : [action.payload];
            }
        },
        

        removeNotificationData: (state, action: PayloadAction<string>) => {
            state.notifacations = (state.notifacations || []).filter(
                (notification) => notification.notificationId !== action.payload
            );
        },
        
        

    },


});

export const { setNotification,setsocketNotification,removeNotificationData } = notificationReducer.actions;
export default notificationReducer.reducer;