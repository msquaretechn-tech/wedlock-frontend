import React from "react";
import { Modal, Select, Form, Input, Col, Row } from "antd";
import { createStyles } from "antd-style";
import TextArea from "antd/es/input/TextArea";

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

interface LifestyleModelProps {
  isVisible: boolean;
  onClose: () => void;
}

const LifestyleModel: React.FC<LifestyleModelProps> = ({
  isVisible,
  onClose,
}) => {
  const { styles } = useStyle();

  const { Option } = Select;

  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
    title: styles["my-modal-title"],
  };

  const [form] = Form.useForm<{ name: string; age: number }>();

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

  return (
    <div className="flex items-center">
      <Modal
        open={isVisible}
        onCancel={onClose}
        wrapClassName="my-modal-content"
        classNames={classNames}
        styles={modalStyles}
        title={
          <span className={styles["my-modal-title"]}>Basic & LifeStyle </span>
        }
        centered
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="displayName" label="Display Name">
                <Input placeholder="Enter Display Name" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="gender" label="Gender">
                <Select placeholder="Select Gender">
                  <Option value="man">Male</Option>
                  <Option value="woman">Female</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="age" label="Age">
                <Input placeholder="Enter Age" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="religion" label="Religion">
                <Input placeholder="Enter Religion" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="maritalstatus" label="Marital status">
                <Select placeholder="Select Marital Status">
                  <Option value="single">Single</Option>
                  <Option value="married">Married</Option>
                  <Option value="widow">Widow</Option>
                  <Option value="divorced">Divorced</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="abou" label="About">
                <TextArea
                  placeholder="Description"
                  rows={5}
                  showCount
                  maxLength={500}
                  style={{
                    resize: "none",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default LifestyleModel;
