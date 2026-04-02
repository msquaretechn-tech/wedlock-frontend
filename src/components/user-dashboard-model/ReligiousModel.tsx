import { Modal} from "antd";
import { createStyles} from "antd-style";
import { Form, Input ,Select} from "antd";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useUpdateReligiousBackgroundMutation } from "../../Redux/Api/profile.api";
import { toast } from "sonner";
import { useGetReligionQuery,useGetCommunityQuery,useGetGotraQuery,useGetMotherToungueQuery } from "../../Redux/Api/dropdown.api";
import { useEffect, useState } from "react";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateReligiousBackgroundDetails } from "../../Redux/Reducers/user.reducer";





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

interface ReligiousModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ReligiousModel: React.FC<ReligiousModalProps> = ({
  isVisible,
  onClose,
}) => {
  const dispatch = useDispatch();


  const [religion, setReligion] = useState<{ id: string; value: string }[]>([]);
  const [community, setCommunity] = useState<{ id: string; value: string }[]>([]);
  const [gotra, setGotra] = useState<{ id: string; value: string }[]>([]);
  const [motherTongue, setMotherTongue] = useState<{ id: string; value: string }[]>([]);
  const {myDetails } = useSelector((state: RootState) => state.userReducer) ;



  const { data: ReligionData } = useGetReligionQuery();
  const { data: CommunityData } = useGetCommunityQuery();
  const { data: GotraData} = useGetGotraQuery();
  const { data: MotherToungueData} = useGetMotherToungueQuery();


  useEffect(() => {
    if(ReligionData){
      setReligion((ReligionData as any).data);
    }
    if(CommunityData){
      setCommunity((CommunityData as any).data);
    }
    if(GotraData){
      setGotra((GotraData as any).data);
    }
    if(MotherToungueData){
      setMotherTongue((MotherToungueData as any).data);
    }
  }, [ReligionData,CommunityData,GotraData,MotherToungueData]);





  const { styles } = useStyle();


  
  type ApiResponse = {
    success: boolean;
    message: string;
  };
  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };

  const [form] = Form.useForm();


  const [updateReligiousBackground, { isLoading }] = useUpdateReligiousBackgroundMutation();

  

  const handleFormSubmit = async (values: any) => {
    try {
      const res = await updateReligiousBackground(values);
      console.log(res);

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;

        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      }

      console.log(values.religion);

      const data = {
        religion: values.religion || myDetails?.religious_background?.religion || null,
        subCommunity: values.subCommunity || myDetails?.religious_background?.subCommunity || null,
        community: values.community || myDetails?.religious_background?.community || null,
        gotra: values.gotra || myDetails?.religious_background?.gotra || null,
        motherTongue: values.motherTongue || myDetails?.religious_background?.motherTongue || null,
        timeOfBirth:  myDetails?.religious_background?.timeOfBirth || null,
        dateOfBirth:  myDetails?.religious_background?.dateOfBirth || null,
        placeOfBirth: values.placeOfBirth || myDetails?.religious_background?.placeOfBirth || null,
      };
  
        dispatch(updateReligiousBackgroundDetails(data));
    
      const successData = res.data as ApiResponse;
      toast.success(successData.message);
      onClose();

    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

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
          <span className={styles["my-modal-title"]}>Religious Background</span>
        }
        centered
        confirmLoading={isLoading}
      >
        <Form form={form} layout="vertical" autoComplete="off" onFinish={handleFormSubmit}>
          <Form.Item name="religion" label="Religion" rules={[{ required: false , message: "Please enter your religion"}]}  >
            <Select placeholder="Select Religion" defaultValue={myDetails?.religious_background?.religion} >
              {religion.map((religion) => (
                <Select.Option key={religion.id} value={religion.value}>
                  {religion.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>


          <Form.Item name="subCommunity" label="Sub Community"  rules={[{ required: false , message: "Please enter your sub community"}]}>
            <Input placeholder="Enter Sub Community" />
          </Form.Item>
          <Form.Item name="community" label="Community" rules={[{ required: false , message: "Please enter your community"}]}>
            <Select placeholder="Select Community" defaultValue={myDetails?.religious_background?.community} >
              {community.map((community) => (
                <Select.Option key={community.id} value={community.value}>
                  {community.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="gotra" label="Gothra/Gothram" rules={[{ required: false , message: "Please enter your Gothra"}]}>
           {
            <Select placeholder="Select Gothra" defaultValue={myDetails?.religious_background?.gotra} >
              {gotra.map((gotra) => (
                <Select.Option key={gotra.id} value={gotra.value}>
                  {gotra.value}
                </Select.Option>
              ))}
            </Select>
           }
          </Form.Item>
          {/* <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: false , message: "Please enter your date of birth"}]}>
            <DatePicker placeholder="Enter Date of Birth" className="w-full" />
          </Form.Item>
          <Form.Item name="timeOfBirth" label="Time of Birth" rules={[{ required: false , message: "Please enter your time of birth"}]}>
            <TimePicker placeholder="Enter Time of Birth" className="w-full" />
          </Form.Item> */}
          <Form.Item name="placeOfBirth" label="Place of Birth" rules={[{ required: false , message: "Please enter your place of birth"}]}>
            <Input placeholder="Enter Place of Birth"   />
          </Form.Item>

          <Form.Item name="motherTongue" label="Mother Tongue" rules={[{ required: false , message: "Please enter your mother tongue"}]}>
          <Select placeholder="Select Mother Tongue" >
              {motherTongue.map((motherTongue) => (
                <Select.Option key={motherTongue.id} value={motherTongue.value}>
                  {motherTongue.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
        </Form>
      </Modal>
    </div>
  );
};

export default ReligiousModel;
