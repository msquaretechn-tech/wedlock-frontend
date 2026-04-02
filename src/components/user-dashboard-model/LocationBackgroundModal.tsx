import React, { useEffect, useState } from "react";
import { Modal, Select, Form, Input, Col, Row } from "antd";
import { createStyles } from "antd-style";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useUpdateLocationDetailsMutation } from "../../Redux/Api/profile.api";
import { toast } from "sonner";
import { Country, State } from "country-state-city";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateLocationDetail } from "../../Redux/Reducers/user.reducer";



import { useGetAustralianVisaStatusQuery,useGetCitizenshipQuery } from "../../Redux/Api/dropdown.api";



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

interface LocationBagroundModelProps {
  isVisible: boolean;
  onClose: () => void;
}

const LocationBackgroundModal: React.FC<LocationBagroundModelProps> = ({
  isVisible,
  onClose,
}) => {
  const [citizenship, setCitizenship] = useState<{ id: string; value: string }[]>([]);
  const [australianVisaStatus, setAustralianVisaStatus] = useState<{ id: string; value: string }[]>([]);
  const dispatch = useDispatch();
  const {myDetails } = useSelector((state: RootState) => state.userReducer) ;

  const { data: citizenshipData} = useGetCitizenshipQuery();
  const { data: australianVisaStatusData} = useGetAustralianVisaStatusQuery();

  useEffect(() => {
    if (citizenshipData) {
      setCitizenship((citizenshipData as any).data);
    }
    if (australianVisaStatusData) {
      setAustralianVisaStatus((australianVisaStatusData as any).data);
    }
  }, [citizenshipData, australianVisaStatusData]);



  const { styles } = useStyle();

  type ApiResponse = {
    success: boolean;
    message: string;
  };
  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };
  const [form] = Form.useForm();

  const [updateLocationDetails, { isLoading }] = useUpdateLocationDetailsMutation();


  const { Option } = Select;
  
  

  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
    title: styles["my-modal-title"],
  };


   const handleFormSubmit = async (values: any) => {
    try {
      const res = await updateLocationDetails(values);

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;

        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      }

      const data = {
        currentLocation: values.currentLocation || myDetails?.location_background?.currentLocation || null,
        cityOfResidence: values.cityOfResidence || myDetails?.location_background?.cityOfResidence || null,
        country: values.country || myDetails?.location_background?.country || null,
        state: values.state || myDetails?.location_background?.state || null,
        nationality: values.nationality || myDetails?.location_background?.nationality || null,
        citizenShip: values.citizenship || myDetails?.location_background?.citizenShip || null,
        residencyVisaStatus: values.residencyVisaStatus || myDetails?.location_background?.residencyVisaStatus || null,
      };


      dispatch(updateLocationDetail(data));


      const successData = res.data as ApiResponse;
      toast.success(successData.message);
      onClose();

    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
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
        onOk={()=>form.submit()}
        wrapClassName="my-modal-content"
        classNames={classNames}
        styles={modalStyles}
        title={
          <span className={styles["my-modal-title"]}>Current Location</span>
        }
        centered
        confirmLoading={isLoading}

      >
        <Form form={form} layout="vertical" autoComplete="off" onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={24}>
            <Form.Item name="currentLocation" label="Location">
              <Input placeholder="Enter Current Location" defaultValue={myDetails?.location_background?.currentLocation} />
            </Form.Item>
            </Col>

            <Col span={24}>
            <Form.Item name="cityOfResidence" label="City of Residence">
              <Input placeholder="Enter City of Residence" defaultValue={myDetails?.location_background?.cityOfResidence} />
            </Form.Item>
            </Col>



            <Col span={24}>
              <Form.Item name="country" label="Country">
               {
                <Select placeholder="Select Current Location">
                  {Country.getAllCountries().map((country) => (
                    <Option key={country.isoCode} value={country.name} defaultValue={myDetails?.location_background?.country}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
               }
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="state" label="State">
              <Select placeholder="Select Current Location" defaultValue={myDetails?.location_background?.state}>
                  {State.getAllStates().map((states) => (
                    <Option key={states.isoCode} value={states.name}>
                      {states.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="nationality" label="Nationality">
                {
                  <Select placeholder="Select Nationality" defaultValue={myDetails?.location_background?.nationality}>
                    {citizenship.map((citizenship) => (
                      <Option key={citizenship.id} value={citizenship.value}>
                        {citizenship.value}
                      </Option>
                    ))}
                  </Select>
                }
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="citizenShip" label="Citizenship">
              {
                  <Select placeholder="Select Citizenship" defaultValue={myDetails?.location_background?.citizenShip}>
                    {citizenship.map((citizenship) => (
                      <Option key={citizenship.id} value={citizenship.value}>
                        {citizenship.value}
                      </Option>
                    ))}
                  </Select>
                }
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="residencyVisaStatus"
                label="Australian Visa Status"
              >
                <Select placeholder="Select Residency Visa Status" defaultValue={myDetails?.location_background?.residencyVisaStatus}>
                  {
                    australianVisaStatus.map((australianVisaStatus) => (
                      <Option
                        key={australianVisaStatus.id}
                        value={australianVisaStatus.value}
                      >{australianVisaStatus.value}</Option>))  
                  }         
                          </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default LocationBackgroundModal;
