import{ useState,useEffect } from "react";

import { Modal, Select, Form } from "antd";
import { createStyles} from "antd-style";
import { useUpdateFamilyDetailsMutation } from "../../Redux/Api/profile.api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateFamilyDetail } from "../../Redux/Reducers/user.reducer";

import { useGetFatherOccupationQuery,useGetMotherOccupationQuery } from "../../Redux/Api/dropdown.api";


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

interface FamilyModelProps {
  isVisible: boolean;
  onClose: () => void;
}

const FamilyModel: React.FC<FamilyModelProps> = ({ isVisible, onClose }) => {
  const [updateFamilyDetails, { isLoading }] = useUpdateFamilyDetailsMutation();
  const [fatherOccupation, setFatherOccupation] = useState<{ id: string; value: string }[]>([]);
  const [motherOccupation, setMotherOccupation] = useState<{ id: string; value: string }[]>([]);

  const { data: fatherOccupationData } = useGetFatherOccupationQuery();
  const { data: motherOccupationData} = useGetMotherOccupationQuery();
   const dispatch = useDispatch();
  
    const {myDetails } = useSelector((state: RootState) => state.userReducer) ;
  

  const { styles } = useStyle();
  const { Option } = Select;

  useEffect(() => {
    if(fatherOccupationData){
      setFatherOccupation((fatherOccupationData as any).data);
    }
    if(motherOccupationData){
      setMotherOccupation((motherOccupationData as any).data);
    }
    
  }, [fatherOccupationData,motherOccupationData]);





  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
    title: styles["my-modal-title"],
  };

  const [form] = Form.useForm();

  const siblingCounts = [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12];
  type ApiResponse = {
    success: boolean;
    message: string;
  };
  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const res = await updateFamilyDetails(values);
      console.log(res);

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;

        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      }

      console.log(values);

      const data = {
        fatherOccupation: values.fatherOccupation || myDetails?.family_details?.fatherOccupation || null,
        motherOccupation: values.motherOccupation || myDetails?.family_details?.motherOccupation || null,
        numberOfSiblings: values.numberOfSiblings || myDetails?.family_details?.numberOfSiblings || null,
        livingWithFamily: values.livingWithFamily || myDetails?.family_details?.livingWithFamily || null,
      };


      dispatch(updateFamilyDetail(data));



      const successData = res.data as ApiResponse;
      toast.success(successData.message);
      onClose();
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center">
      <Modal
        open={isVisible}
        onCancel={onClose}
        onOk={() => form.submit()}        
        wrapClassName="my-modal-content"
        classNames={classNames}
        title={
          <span className={styles["my-modal-title"]}>Family Background</span>
        }
        centered
        confirmLoading={isLoading}
        
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="fatherOccupation"
            label="Father's Occupation"
            rules={[{ required: false, message: "Please select father's occupation" }]}
          >
            <Select placeholder="Select father's occupation" defaultValue={myDetails?.family_details?.fatherOccupation}>
              {fatherOccupation.map((occupation) => (
                <Option key={occupation.id} value={occupation.value}>
                  {occupation.value}
                </Option>
              ))}
            </Select>
          </Form.Item>

           <Form.Item
            name="motherOccupation"
            label="Mother's Occupation"
            rules={[{ required: false, message: "Please select mother's occupation" }]}
          >
            <Select placeholder="Select mother's occupation" defaultValue={myDetails?.family_details?.motherOccupation}>
              {motherOccupation.map((occupation) => (
                <Option key={occupation.id} value={occupation.value}>
                  {occupation.value }
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="numberOfSiblings"
            label="Number of Siblings"
            rules={[{ required: false, message: "Please select number of siblings" }]}
          >
            <Select placeholder="Select Number of Siblings" defaultValue={myDetails?.family_details?.numberOfSiblings}>
              {siblingCounts.map((siblingCount) => (
                <Option key={siblingCount} value={siblingCount}>
                  {siblingCount}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="livingWithFamily"
            label="Living with Family"
            rules={[{ required: false, message: "Please select an option" }]}
          >
            <Select placeholder="Select Living with Family" defaultValue={myDetails?.family_details?.livingWithFamily}>
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FamilyModel;
