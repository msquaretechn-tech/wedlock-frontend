import React, { useState,useEffect } from "react";
import { Modal, Select, Form, Col, Row } from "antd";
import { createStyles } from "antd-style";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useUpdateEducationAndFinancialDetailsMutation } from "../../Redux/Api/profile.api";
import { toast } from "sonner";
// import { Income, Occupations, Qualifications } from "../../data/data";
import { useGetIncomeQuery, useGetOccupationQuery,useGetQualificationQuery } from "../../Redux/Api/dropdown.api";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateEducationDetails } from "../../Redux/Reducers/user.reducer";


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

interface EducationalModelProps {
  isVisible: boolean;
  onClose: () => void;
}

const ReligiouModel: React.FC<EducationalModelProps> = ({
  isVisible,
  onClose,
}) => {
  const dispatch = useDispatch();

  const {myDetails } = useSelector((state: RootState) => state.userReducer) ;

  const { styles } = useStyle();

  type ApiResponse = {
    success: boolean;
    message: string;
  };

  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };

  const [form] = Form.useForm();
  const [qualifications, setQualifications] = useState<{ id: string; value: string }[]>([]);
  const [incomes, setIncomes] = useState<{ id: string; value: string }[]>([]);
  const [occupations, setOccupations] = useState<{ id: string; value: string }[]>([]);

  const [updateEducationAndFinancialDetails, { isLoading }] = useUpdateEducationAndFinancialDetailsMutation();

  const { data: QualificationsData } = useGetQualificationQuery();
  const { data: OccupationsData, } = useGetOccupationQuery();
  const { data: IncomeData} = useGetIncomeQuery();



  useEffect(() => {
    if (QualificationsData) {
      setQualifications((QualificationsData as any).data);
    }

    if (OccupationsData) {
      setOccupations((OccupationsData as any).data);
    }

    if (IncomeData) {
      setIncomes((IncomeData as any).data);
    }
  }, [QualificationsData, OccupationsData, IncomeData]);





  const handleFormSubmit = async (values: any) => {
    try {
      const res = await updateEducationAndFinancialDetails(values);
      console.log(res);

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;

        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      }

      const data = {
        qualification: values.qualification || myDetails?.education_and_financial?.qualification || null,
        occupation: values.occupation || myDetails?.education_and_financial?.occupation || null,
        workingStatus: values.currentWorkingStatus || myDetails?.education_and_financial?.workingStatus || null,
        income: values.income || myDetails?.education_and_financial?.income || null,
      };

      console.log(data);

      dispatch(updateEducationDetails(data));



      const successData = res.data as ApiResponse;
      toast.success(successData.message);
      onClose();

    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };



  const { Option } = Select;

  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
    title: styles["my-modal-title"],
  };


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
        onOk={() => form.submit()}        
        wrapClassName="my-modal-content"
        classNames={classNames}
        styles={modalStyles}
        title={
          <span className={styles["my-modal-title"]}>Education and Financial</span>
        }
        centered
        confirmLoading={isLoading}
      >
        <Form form={form} layout="vertical" autoComplete="off" onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="qualification" label="Qualification" >
                <Select placeholder="Select qualification" defaultValue={myDetails?.education_and_financial?.qualification}>
                  {qualifications.map((qualification) => (
                    <Option key={qualification.id} value={qualification.value}>
                      {qualification.value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="occupation" label="Occupation">
                <Select placeholder="Select Occupation" defaultValue={myDetails?.education_and_financial?.occupation}>
                 {
                  occupations.map((occupation) => (
                    <Option key={occupation.id} value={occupation.value}>
                      {occupation.value}
                    </Option>
                  ))
                 }
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="currentWorkingStatus" label="Working Status"  >
                <Select placeholder="Select Working Status" defaultValue={myDetails?.education_and_financial?.workingStatus}>
                <Option value={"working"}>Working</Option>
                <Option value={"selfEmployed"}>Self-employed</Option>
                <Option value={"unemployed"}>Unemployed</Option>
                <Option value={"retired"}>Retired</Option>
                <Option value="others">Others</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Income" name="income">
                <Select placeholder="Select Income" defaultValue={`${myDetails?.education_and_financial?.income}`}>
                {incomes.map((income) => (
                  <Option key={income.id} value={income.value}>
                    {income.value}
                  </Option>
                  
                ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ReligiouModel;
