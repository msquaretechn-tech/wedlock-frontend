import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { auth, database } from "../../../utils/firebaseConfig";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { SetReauthenticatePassword, logout } from "../../Redux/Reducers/user.reducer";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useDeleteUserMutation } from "../../Redux/Api/user.api";
import { ref, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReauthenticateModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { confirm } = Modal;

  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [deleteUser] = useDeleteUserMutation();


  const handleDelete = async () => {
    try {
      if (!user?.uid) {
        toast.error("User not authenticated.");
        return;
      }

      // Delete user data from Firebase Realtime Database
      const userRef = ref(database, `users/${user.uid}`);
      await remove(userRef);

      // Delete user from Firebase Authentication
      await auth.currentUser?.delete();

      const response = await deleteUser().unwrap();

      if (response?.success) {
        toast.success(response.message);

        // Clear cookies
        const cookiesToRemove = [
          "isImageFormFilled",
          "isProfileFormFilled",
          "isLocationFormFilled",
          "isQualificationFormFilled",
          "isOtherFormFilled",
          "isPersonalFormFilled",
          "fcmToken",
          "uid",
        ];
        cookiesToRemove.forEach((cookie) => Cookies.remove(cookie));

        dispatch(logout());
        localStorage.clear();

        navigate("/");
        window.location.reload();
      } else {
        toast.error("Delete failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the account.");
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this account?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: handleDelete,
    });
  };

  const VerifyPassword = async () => {
    if (!user?.email) {
      toast.error("User email is missing. Cannot reauthenticate.");
      return;
    }

    if (!auth.currentUser) {
      toast.error("User is not authenticated. Cannot reauthenticate.");
      return;
    }

    setLoading(true);
    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      toast.success("Password re-authenticated successfully!");
      dispatch(SetReauthenticatePassword(password));

      onClose();

      showDeleteConfirm();
    } catch (error) {
      toast.error("Failed to reauthenticate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <Modal
      title="Reauthentication Required"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={loading}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={VerifyPassword} loading={loading}>
          Verify
        </Button>,
      ]}
    >
      <Input.Password
        placeholder="Enter your password"
        className="w-full border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setPassword(e.target.value)}
        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
      />
    </Modal>
  );
};

export default ReauthenticateModal;
