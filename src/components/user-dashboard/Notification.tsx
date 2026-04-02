import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import ConnectionAccepted from "../ConnectionAccepted";
import {
  setNotification,
  removeNotificationData
} from "../../Redux/Reducers/notification.reducers";
import Connection from "../../components/Connection";
import { useGetNotificationQuery } from "../../Redux/Api/notification.api";
import {useRemoveNotificationMutation} from "../../Redux/Api/notification.api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useCancelConnectionMutation,useAcceptConnectionMutation } from "../../Redux/Api/connection.api";
import { toast } from "sonner";

const Notification = () => {
  const dispatch = useDispatch();

  const { data: notificationData, isLoading } = useGetNotificationQuery<any>();

  const [removeNotification,] = useRemoveNotificationMutation<any>();
  const [cancel,{isLoading:isLoadingCancel}] = useCancelConnectionMutation();
  const [accept, { isLoading: isLoadingAccept }] = useAcceptConnectionMutation();




  const handleRemoveNotification = async (notificationId: string) => {
    try {
      await removeNotification(notificationId);
      dispatch(removeNotificationData(notificationId));
      toast.success("Notification removed successfully!");
    } catch (error) {
      toast.error("Failed to remove notification.");
    }
  };
  const { notifacations: notifications } = useSelector(
    (state: RootState) => state.notificationReducer
  );
  // const { user } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    if (!isLoading && notificationData) {
      dispatch(setNotification(notificationData.data));
    }
  }, [notificationData, isLoading, dispatch]);


  
  type ApiResponse = {
    success: boolean;
    message: string;
    data?: any;
  };


  const acceptConnection = async(notificationId: string, senderId: string) => {
    try {
    const response = await accept(senderId);
    if (response.error) {
      const errorData = response.error as FetchBaseQueryError;
      toast.error((errorData.data as ApiResponse).message);
      return;
    }
    await removeNotification(notificationId);
    dispatch(removeNotificationData(notificationId));
    toast.success("Connection accepted!");
    } catch (error) {
      toast.error("Failed to accept connection. Please try again later.");
    }
  };

  const rejectConnection = async(notificationId: string, senderId: string) => {
    try {
      const recieverId = senderId;
    const response = await cancel(recieverId);
    if (response.error) {
      const errorData = response.error as FetchBaseQueryError;
      toast.error((errorData.data as ApiResponse).message);
      return;
    }
    await removeNotification(notificationId);
    dispatch(removeNotificationData(notificationId));
    toast.success("Connection rejected!");
    } catch (error) {
      toast.error("Failed to reject connection. Please try again later.");
    }
  };



  return (
    <div className="space-y-4 min-h-screen">
      {notifications?.length === 0 && !isLoading  ? (
        <p className="text-center">No notifications yet</p>
      ) : (
        notifications?.map((notification) => (
          console.log(notification, "notification"),
          <div
            key={notification.notificationId}
            className="p-4 bg-white border rounded-lg shadow-md mb-4"
          >
            <div className="flex justify-end">
              <button
                className="mt-2 text-red-500"
                onClick={() => handleRemoveNotification(notification.notificationId)}
              >
                Remove
              </button>
            </div>
            
            {notification.body?.type === "connection_request" ?(
            
              <Connection
                senderImage={notification.body?.senderImage}
                senderName={notification.body?.senderName}
                AcceptButton={
                  <button
                    onClick={() =>
                      acceptConnection(
                        notification.notificationId,
                        notification.body?.senderId
                      )
                    }
                    disabled={isLoadingAccept || isLoadingCancel}
                    className={`px-4 py-2 text-white rounded ${
                      isLoadingAccept
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-500"
                    }`}
                  >
                    {isLoadingAccept ? "Accepting..." : "Accept"}
                  </button>
                }
                RejectButton={
                  <button
                    className={`px-4 py-2 text-white rounded ${
                      isLoadingCancel
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-500"
                    }`}
                    onClick={() =>
                      rejectConnection(
                        notification.notificationId,
                        notification.body?.senderId
                      )
                    }
                    disabled={isLoadingAccept || isLoadingCancel}
                  >
                    {isLoadingCancel ? "Rejecting..." : "Reject"}
                  </button>
                }
              />

            ):(
              
              <ConnectionAccepted senderImage={notification.body?.senderImage} senderName={notification.body?.senderName} />
            
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
