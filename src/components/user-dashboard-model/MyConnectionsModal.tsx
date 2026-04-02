import React from "react";
import { Modal, List, Avatar, Button, Empty } from "antd";
import { createStyles } from "antd-style";
import { useGetMyConnectionsQuery } from "../../Redux/Api/connection.api";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { RiUserSharedLine } from "react-icons/ri";

const useStyle = createStyles(({ token }) => ({
  "my-modal-body": {
    background: token.blue1,
    padding: token.paddingLG,
  },
  "my-modal-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
  "my-modal-header": {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },
  "my-modal-footer": {
    color: token.colorPrimary,
  },
  "my-modal-content": {
    border: "1px solid #333",
  },
  "my-modal-title": {
    color: "#007EAF",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  "connection-item": {
    padding: "16px",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "#f0f9ff",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    },
  },
}));

interface MyConnectionsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const MyConnectionsModal: React.FC<MyConnectionsModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { styles } = useStyle();
  const { data: connectionsData, isLoading, isError } = useGetMyConnectionsQuery(undefined, {
    skip: !isVisible,
  });

  const connections = connectionsData?.data || [];

  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
    title: styles["my-modal-title"],
  };

  const modalStyles = {
    header: { borderRadius: 0 },
    mask: { backdropFilter: "blur(10px)" },
    content: { boxShadow: "0 0 30px #999" },
  };

  console.log('Connection', connections)

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={600}
      classNames={classNames}
      styles={modalStyles}
      title={
        <div className="flex items-center gap-2">
          <RiUserSharedLine className="text-[#007EAF]" />
          <span>My Connections ({connections.length})</span>
        </div>
      }

      centered
    >
      <div className="max-h-[60vh] overflow-y-auto px-2 custom-scrollbar">
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loading />
          </div>
        ) : isError ? (
          <div className="py-20 text-center text-red-500 font-medium">
            Failed to load connections. Please try again later.
          </div>
        ) : connections.length === 0 ? (
          <div className="py-20">
            <Empty description="No connections found" />
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={connections}
            renderItem={(item: any) => (
              <List.Item className={styles["connection-item"]} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item.profileImage?.[0] || "https://xsgames.co/randomusers/avatar.php?g=pixel"}
                      size={64}
                      className="border-2 border-[#007EAF]"
                    />
                  }
                  title={
                    <Link to={`/profile/${item._id}`} onClick={onClose} className="text-lg font-bold text-gray-800 hover:text-[#007EAF]">
                      {item.basic_and_lifestyle?.firstName} {item.basic_and_lifestyle?.lastName}
                    </Link>
                  }
                  description={
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-500 capitalize">
                        {item.basic_and_lifestyle?.gender} • {item.basic_and_lifestyle?.age} years
                      </span>
                      <span className="text-gray-400 text-xs">
                        {item.personal_background?.religion} • {item.location_details?.city}, {item.location_details?.country}
                      </span>
                    </div>
                  }
                />
                <Button
                  type="primary"
                  ghost
                  shape="round"
                  className="border-[#007EAF] text-[#007EAF]"
                  href={`/profile/${item._id}`}
                  onClick={onClose}
                >
                  View Profile
                </Button>
              </List.Item>
            )}
          />
        )}
      </div>
    </Modal>
  );
};

export default MyConnectionsModal;
