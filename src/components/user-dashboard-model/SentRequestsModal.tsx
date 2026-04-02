import React from "react";
import { Modal, List, Button, Empty } from "antd";
import { createStyles } from "antd-style";
import { useGetSentConnectionRequestsQuery } from "../../Redux/Api/connection.api";
import Loading from "../Loading";
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

interface SentRequestsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SentRequestsModal: React.FC<SentRequestsModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { styles } = useStyle();
  const { data: sentData, isLoading, isError } = useGetSentConnectionRequestsQuery(undefined, {
    skip: !isVisible,
  });

  const requests = sentData?.data || [];

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
          <span>Sent Connection Requests ({requests.length})</span>
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
            Failed to load sent requests. Please try again later.
          </div>
        ) : requests.length === 0 ? (
          <div className="py-20">
            <Empty description="No sent requests found" />
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={requests}
            renderItem={(item: any) => (
              <List.Item className={styles["connection-item"]} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <List.Item.Meta
                  title={
                    <div className="flex items-center justify-between w-full">
                      <span className="text-gray-800 font-semibold">User ID: {item.userId}</span>
                      <Button 
                        type="primary" 
                        ghost 
                        shape="round"
                        href={`/profile/${item.userId}`}
                        onClick={onClose}
                      >
                        View Profile
                      </Button>
                    </div>
                  }
                  description={
                    <div className="text-xs text-gray-500 italic">
                      Request is currently pending
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>
    </Modal>
  );
};

export default SentRequestsModal;
