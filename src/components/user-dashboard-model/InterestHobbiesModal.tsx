import React, { useState } from "react";
import { Modal, Tag, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ token }) => ({
  "my-modal-body": {
    background: token.blue1,
    padding: token.paddingSM,
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
  },
}));

const modalStyles = {
  header: {
    borderRadius: 0,
  },
  mask: {
    backdropFilter: "blur(10px)",
  },
  content: {
    boxShadow: "0 0 30px #999",
  },
};

interface InterestHobbiesModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const InterestHobbiesModal: React.FC<InterestHobbiesModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { styles } = useStyle();

  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
    title: styles["my-modal-title"],
  };

  const [tags, setTags] = useState([
    "Photographie",
    "Cinema",
    "Technologie",
    "Musique",
    "Sport",
    "Voyages",
    "Lecture",
    "Théâtre",
  ]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClose = (removedTag: string) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const tagInputStyle: React.CSSProperties = {
    width: 78,
    verticalAlign: "top",
  };

  const tagStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8px",
    borderRadius: "25px",
    height: "2.5rem",
    fontSize: "1rem",
    backgroundColor: "#E6E8EC",
    textAlign: "center",
    padding: "0 10px",
  };
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  };

  return (
    <div className="flex items-center">
      <Modal
        open={isVisible}
        onCancel={onClose}
        wrapClassName="my-modal-content"
        classNames={classNames}
        styles={modalStyles}
        title={
          <span className={styles["my-modal-title"]}>Interest and Hobbies</span>
        }
        footer={[
          <Button key="back" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={onClose}>
            Save
          </Button>,
        ]}
        centered
      >
        <div style={containerStyle}>
          {tags.map((tag) => (
            <Tag key={tag} onClose={() => handleClose(tag)} style={tagStyle}>
              {tag}
            </Tag>
          ))}
          {inputVisible && (
            <Input
              type="text"
              size="small"
              style={tagInputStyle}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={showInput}
              className="site-tag-plus h-2rem flex items-center rounded-3xl border-[#0B63E5] px-4 text-center text-lg text-[#0B63E5]"
            >
              <PlusOutlined className="text-sm" /> Add
            </Tag>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default InterestHobbiesModal;
