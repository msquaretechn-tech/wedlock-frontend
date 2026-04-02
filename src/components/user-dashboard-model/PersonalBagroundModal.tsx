import React, { useEffect, useState } from "react";
import { Modal, Select, Form,  Col, Row } from "antd";
import { createStyles } from "antd-style";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useUpdatePersonalBackgroundMutation } from "../../Redux/Api/profile.api";
import { toast } from "sonner";
// import { bodyType, Complexions, Diet, DrinkingHabbit, Heights, motherTongue, SmokingHabbit, } from "../../data/data";
import { useGetBodyTypeQuery,useGetComplexionQuery,useGetDietQuery,useGetDrinkingHabbitQuery,useGetHeightQuery,useGetMotherToungueQuery,useGetSmokingHabbitQuery } from "../../Redux/Api/dropdown.api";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatePersonalDetails } from "../../Redux/Reducers/user.reducer";




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

interface PersonalBagroundModelProps {
  isVisible: boolean;
  onClose: () => void;
}

const ReligiouModel: React.FC<PersonalBagroundModelProps> = ({
  isVisible,
  onClose,
}) => {
  const [bodyType, setBodyType] = useState<{ id: string; value: string }[]>([]);
  const [complexion,setComplexion] = useState<{id:string; value: string}[]>([]);
  const [diet,setDiet] = useState<{id:string; value: string}[]>([]);
  const [drinkingHabbit,setDrinkingHabbit] = useState<{id:string; value: string}[]>([]);
  const [height,setHeight] = useState<{id:string; value: string}[]>([]);
  const [motherTongue,setMotherTongue] = useState<{id:string; value: string}[]>([]);
  const [smokingHabbit,setSmokingHabbit] = useState<{id:string; value: string}[]>([]);

  const dispatch = useDispatch();
  const {myDetails } = useSelector((state: RootState) => state.userReducer) ;




  const { data: bodyTypeData } = useGetBodyTypeQuery();
  const { data: complexionData} = useGetComplexionQuery();
  const { data: dietData} = useGetDietQuery();
  const { data: drinkingHabbitData} = useGetDrinkingHabbitQuery();
  const { data: heightData } = useGetHeightQuery();
  const { data: motherTongueData } = useGetMotherToungueQuery();
  const { data: smokingHabbitData } = useGetSmokingHabbitQuery();

  useEffect(()=>{
    if(bodyTypeData){
      setBodyType((bodyTypeData as any).data)
    }
    if(complexionData){
      setComplexion((complexionData as any).data)
    }
  
    if(drinkingHabbitData){
      setDrinkingHabbit((drinkingHabbitData as any).data)
    }
    
    if(heightData){
      setHeight((heightData as any).data)
    }
    if(motherTongueData){
      setMotherTongue((motherTongueData as any).data)
    }
    if(smokingHabbitData){
      setSmokingHabbit((smokingHabbitData as any).data)
    }
    if(dietData){
      setDiet((dietData as any).data)
    }

  },[bodyTypeData,complexionData,drinkingHabbitData,heightData,dietData,motherTongueData,smokingHabbitData])



  const { styles } = useStyle();

  type ApiResponse = {
    success: boolean;
    message: string;
  };
  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };


  const [updatePersonalBackground, { isLoading }] = useUpdatePersonalBackgroundMutation();


  const { Option } = Select;


  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
    title: styles["my-modal-title"],
  };

  const [form] = Form.useForm();

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

  const handleFormSubmit = async (values: any) => {
    const height = values.height ;
    const formData = { ...values, height };
    try {
      const res = await updatePersonalBackground(formData);
      console.log(res);

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;

        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      }

      console.log(values.height);

      const data = {
        height: values.height || myDetails?.personal_background?.height || null,
        weight: values.weight || myDetails?.personal_background?.weight || null,
        bodyType: values.bodyType || myDetails?.personal_background?.bodyType || null,
        complexion: values.complexion || myDetails?.personal_background?.complexion || null,
        diet: values.diet || myDetails?.personal_background?.diet || null,
        smokingHabbit: values.smokingHabbit || myDetails?.personal_background?.smokingHabbit || null,
        drinkingHabbit: values.drinkingHabbit || myDetails?.personal_background?.drinkingHabbit || null,
        language: values.mothherTongue || myDetails?.personal_background?.language || null,
      };

      dispatch(updatePersonalDetails(data));

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
        styles={modalStyles}
        title={
          <span className={styles["my-modal-title"]}>Personal Background</span>
        }
        centered
        confirmLoading={isLoading}
      >
        <Form form={form} layout="vertical" autoComplete="off" onFinish={handleFormSubmit}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Height"  name={"height"}>
                <Select placeholder="Select height" defaultValue={myDetails?.personal_background?.height}>
                  {
                    height.map((option) => (
                      <Option key={option.id} value={option.value} defaultValue={myDetails?.personal_background?.height}>
                        {option.value}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="weight" label="Weight" >
                
                  <Select placeholder="Select Weight" defaultValue={`${myDetails?.personal_background?.weight}`}>
                    {Array.from({ length: 100 }, (_, index) => index + 41).map((weight) => (
                      <Select.Option key={weight} value={weight + " kg"}>
                        {weight} kg
                      </Select.Option>
                    ))}
                  </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="language" label="Language" >
                <Select placeholder="Select Language" defaultValue={myDetails?.personal_background?.language} >
                  {
                    motherTongue.map((option) => (
                      <Option key={option.id} value={option.value} defaultValue={myDetails?.personal_background?.language}>
                        {option.value}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="bodyType" label="Body Type" >
                <Select placeholder="Select Body Type" defaultValue={myDetails?.personal_background?.bodyType}>
                  {
                    bodyType.map((option) => (
                      <Option key={option.id} value={option.value} defaultValue={myDetails?.personal_background?.bodyType}>
                        {option.value}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="smokingHabbit" label="Smoking Habbit" >
                <Select placeholder="Select Smoking Habbit" defaultValue={myDetails?.personal_background?.smokingHabbit}>
                  {
                    smokingHabbit.map((option) => (
                      <Option key={option.id} value={option.value} defaultValue={myDetails?.personal_background?.smokingHabbit}>
                        {option.value}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="drinkingHabbit" label="Drinking Habbit" >
                <Select placeholder="Select Drinking Habbit" defaultValue={myDetails?.personal_background?.drinkingHabbit}>
                  {
                    drinkingHabbit.map((option) => (
                      <Option key={option.id} value={option.value} defaultValue={myDetails?.personal_background?.drinkingHabbit}>
                        {option.value}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="diet" label="Diet" >
                <Select placeholder="Select Diet" defaultValue={myDetails?.personal_background?.diet}>
                  {
                    diet.map((option) => (
                      <Option key={option.id} value={option.value} defaultValue={myDetails?.personal_background?.diet}>
                        {option.value}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="complexion" label="Complexion" >
                <Select placeholder="Select Complexion" defaultValue={myDetails?.personal_background?.complexion}>
                  {complexion.map((option) => (
                    <Option key={option.id} value={option.value} defaultValue={myDetails?.personal_background?.complexion}>
                      {option.value}
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
