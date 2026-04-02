import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Button, Row, Col, InputNumber } from "antd";
import { createStyles } from "antd-style";
import { PiSlidersLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useUpdatePreferencesMutation } from "../../Redux/Api/preferences.api";
import { toast } from "sonner";

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
    color: "black",
  },
}));

interface PartnerPreferenceModalProps {
  isVisible: boolean;
  onClose: () => void;
  initialValues?: any;
}

const PartnerPreferenceModal: React.FC<PartnerPreferenceModalProps> = ({
  isVisible,
  onClose,
  initialValues,
}) => {
  const { styles } = useStyle();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [updatePreferences, { isLoading: isUpdating }] = useUpdatePreferencesMutation();

  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const [isExclusive, setIsExclusive] = useState(false);

  useEffect(() => {
    const isExclusiveStatus = localStorage.getItem("isExclusive");
    if (isExclusiveStatus === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
  }, [user]);

  const handleFormSubmit = async (values: any) => {
    // Exactly 9 fields allowed by backend
    const allowedFields = [
      'gender',
      'lookingFor',
      'weddingGoals',
      'age',
      'lookingPartnerAge',
      'livingInAustralia',
      'horoscopeMatch',
      'castReligionMatterOrNot',
      'interest_and_hobbies'
    ];

    const payload = Object.keys(values)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        // Convert age to string as per backend example
        if (key === 'age' && values[key] !== undefined) {
          obj[key] = String(values[key]);
        } else {
          obj[key] = values[key];
        }
        return obj;
      }, {} as any);

    try {
      await updatePreferences(payload).unwrap();
      toast.success("Partner preferences updated successfully!");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update preferences");
    }
  };

  const modalStyles = {
    header: { borderRadius: 0 },
    mask: { backdropFilter: "blur(10px)" },
    content: { boxShadow: "0 0 30px #999" },
  };

  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
    title: styles["my-modal-title"],
  };

  // Exactly matching backend specified values
  const genderOptions = ["Male", "Female"];
  const lookingForOptions = ["Never Married", "Divorced", "Widowed", "Awaiting Divorced"];
  const weddingGoalOptions = ["Within 1 year", "Within 2 years", "Not decided"];
  const livingInAustraliaOptions = ["Yes", "No"];
  const horoscopeOptions = ["Yes", "No"];
  const castReligionMatterOptions = ["Doesn't Matter", "Matter"];
  
  const ageRangeOptions = ["18-25", "26-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60", "61-70"];
  const hobbyOptions = [
    'Collecting', 'Cinema', 'Theater', 'Dancing', 'Cooking', 'Carpentry',
    'Pottery', 'Music', 'Photography', 'Sports', 'Art', 'Craft', 'History', 'Literature'
  ];

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      wrapClassName="my-modal-content"
      width={1000}
      classNames={classNames}
      styles={modalStyles}
      title={
        <div className="flex justify-start">
          <span className="rounded-lg border p-2">
            <PiSlidersLight className="text-2xl" />
          </span>
        </div>
      }
      centered
      footer={
        <div className="flex justify-end gap-4 p-4 border-t">
          <Button onClick={onClose} className="w-32 h-10">
            Cancel
          </Button>
          <Button
            loading={isUpdating}
            onClick={() => form.submit()}
            className={`w-40 h-10 ${isExclusive ? 'bg-[#60457E]' : 'bg-[#007EAF]'} text-white border-none font-semibold`}
          >
            Save Preferences
          </Button>
        </div>
      }
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Proxima-Nova-Semibold, sans-serif" }}>
          Edit Partner Preferences
        </h2>
        <p className="text-gray-500">
          Update your criteria exactly as required by the backend.
        </p>
      </div>

      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
        className="max-h-[65vh] overflow-y-auto px-2 custom-scrollbar"
      >
        <section className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="gender" label={<span className="font-semibold">My Gender</span>}>
                  <Select placeholder="Select Gender">
                    {genderOptions.map(opt => (
                      <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="age" label={<span className="font-semibold">My Age</span>}>
                  <InputNumber min={18} max={100} className="w-full" placeholder="Enter Age" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="lookingFor" label={<span className="font-semibold">Looking For (Marital Status)</span>}>
                  <Select placeholder="Select Preference">
                    {lookingForOptions.map(opt => (
                      <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lookingPartnerAge" label={<span className="font-semibold">Partner Age Range</span>}>
                   <Select placeholder="Select Age Range">
                    {ageRangeOptions.map(opt => (
                      <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="weddingGoals" label={<span className="font-semibold">Wedding Goals</span>}>
                  <Select placeholder="Select Goals">
                    {weddingGoalOptions.map(opt => (
                      <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="livingInAustralia" label={<span className="font-semibold">Living in Australia?</span>}>
                  <Select placeholder="Select Yes/No">
                    {livingInAustraliaOptions.map(opt => (
                      <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="horoscopeMatch" label={<span className="font-semibold">Horoscope Match?</span>}>
                  <Select placeholder="Select Yes/No">
                    {horoscopeOptions.map(opt => (
                      <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="castReligionMatterOrNot" label={<span className="font-semibold">Caste/Religion Matter?</span>}>
                  <Select placeholder="Select Option">
                    {castReligionMatterOptions.map(opt => (
                      <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="interest_and_hobbies" label={<span className="font-semibold">Interests & Hobbies</span>}>
                  <Select mode="multiple" placeholder="Select Hobbies">
                    {hobbyOptions.map(hobby => (
                      <Select.Option key={hobby} value={hobby}>{hobby}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </section>
      </Form>
    </Modal>
  );
};

export default PartnerPreferenceModal;
