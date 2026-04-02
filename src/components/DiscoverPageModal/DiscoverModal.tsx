import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Select,
  Radio,
  Checkbox,
  Button,
  Row,
  Col,
} from "antd";
import { createStyles } from "antd-style";
import { TbUsersPlus } from "react-icons/tb";
import "../../font.css";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";


import {
  useGetCommunityQuery, useGetDietQuery, useGetEthnicsQuery, useGetHeightQuery, useGetIncomeQuery,
  useGetOccupationQuery, useGetQualificationQuery, useGetReligionQuery, useGetSmokingHabbitQuery,
  useGetMaritalStatusQuery
} from "../../Redux/Api/dropdown.api";
import Loading from "../Loading";





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

interface DiscoverModalProps {
  isVisible: boolean;
  onClose: () => void;
  onFormSubmit: (data: any) => void;
}

const DiscoverModal: React.FC<DiscoverModalProps> = ({
  isVisible,
  onClose,
  onFormSubmit,
}) => {
  const { styles } = useStyle();
  const [checkedValues, setCheckedValues] = useState<any[]>([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data: communityData, isLoading: isCommunityLoading } = useGetCommunityQuery();
  const { data: dietData, isLoading: isDietLoading } = useGetDietQuery();
  const { data: ethnicityData, isLoading: isEthnicityLoading } = useGetEthnicsQuery();
  const { data: heightData, isLoading: isHeightLoading } = useGetHeightQuery();
  const { data: incomeData, isLoading: isIncomeLoading } = useGetIncomeQuery();
  const { data: religionData, isLoading: isReligionLoading } = useGetReligionQuery();
  const { data: smokingHabbitData, isLoading: isSmokingHabbitLoading } = useGetSmokingHabbitQuery();
  const { data: occupationData, isLoading: isOccupationLoading } = useGetOccupationQuery();
  const { data: qualificationData, isLoading: isQualificationLoading } = useGetQualificationQuery();
  const {data: maritalStatusData , isLoading:isMaritalStatusLoading} = useGetMaritalStatusQuery();

  const [communities, setcommunities] = useState<{ id: string; value: string }[]>([]);
  const [diet, setDiet] = useState<{ id: string; value: string }[]>([]);
  const [ethnicity, setEthnicity] = useState<{ id: string; value: string }[]>([]);
  const [height, setHeight] = useState<{ id: string; value: string }[]>([]);
  const [income, setIncome] = useState<{ id: string; value: string }[]>([]);
  const [maritalStatus, setMaritalStatus] = useState<{ id: string; value: string }[]>([]);
  const [religion, setReligion] = useState<{ id: string; value: string }[]>([]);
  const [smokingHabits, setSmokingHabits] = useState<{ id: string; value: string }[]>([]);
  const [qualification, setQualification] = useState<{ id: string; value: string }[]>([]);
  const [occupation, setOccupation] = useState<{ id: string; value: string }[]>([]);



  const [isExclusive, setIsExclusive] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
    [];
  });



  useEffect(() => {

    if (communityData) {
      setcommunities((communityData as any).data);

    }

    if (dietData) {
      setDiet((dietData as any).data);
    }

    if (ethnicityData) {
      setEthnicity((ethnicityData as any).data)
    }

    if (heightData) {
      setHeight((heightData as any).data)
    }

    if (incomeData) {
      setIncome((incomeData as any).data)
    }

    if (religionData) {
      setReligion((religionData as any).data)
    }

    if (smokingHabbitData) {
      setSmokingHabits((smokingHabbitData as any).data)
    }

    if (occupationData) {
      setOccupation((occupationData as any).data)
    }

    if (qualificationData) {
      setQualification((qualificationData as any).data)
    }

    if(maritalStatusData){
      setMaritalStatus((maritalStatusData as any).data)
    }



  }, [communityData, dietData, ethnicityData, heightData, incomeData, religionData, smokingHabbitData, occupationData, qualificationData,maritalStatusData])



  const handleCheckboxChange = (checkedValues: any[]) => {
    setCheckedValues(checkedValues);
  };

  const handleRadioChange = (e: any) => {
    setSelectedRadio(e.target.value);
  }; 


  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
    title: styles["my-modal-title"],
  };



  const [form] = Form.useForm();



  const handleFormSubmit = async (values: any) => {
    const data: any = {};
  
    if (values.ageMin && values.ageMax) data.ageRange = `${values.ageMin}-${values.ageMax}`;
    if (values.heightMin && values.heightMax) data.height = `${values.heightMin}-${values.heightMax}`;
    if (values.income) data.income = values.income;
    if (values.religion) data.religion = values.religion;
    if (values.ethnicity) data.ethnicity = values.ethnicity;
    if (values.qualification) data.qualification = values.qualification;
    if (values.smokingHabits) data.smokingHabbit = values.smokingHabits;
    if (values.occupation) data.occupation = values.occupation;
    if (values.maritalStatus) data.maritalStatus = values.maritalStatus;
    if (values.eatingHabits) data.eatingHabbits = values.eatingHabits;
    if (values.caste) data.caste = values.caste;
  
    console.log(data);
  
    onFormSubmit(data);
    onClose();
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
    <Modal
      open={isVisible}
      onCancel={onClose}
      wrapClassName="my-modal-content"
      width={1200}
      classNames={classNames}
      styles={modalStyles}
      title={
        <div className="flex justify-start">
          <span className="rounded-lg border p-2">
            <TbUsersPlus className="text-2xl" />
          </span>
        </div>
      }
      centered
      footer={
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            style={{ marginRight: "8px" }}
            className="w-44"
          >
            Cancel
          </Button>
          <Button onClick={() => form.submit()} className={`w-44 ${isExclusive ? 'bg-[#60457E]' : 'bg-[#007EAF]'} text-white`}>
            Find Members
          </Button>
        </div>
      }
    >
      <div className="mb-4">
        <h2
          className="text-lg"
          style={{ fontFamily: "Proxima-Nova-Semibold, sans-serif" }}
        >
          Filter as per your preference
        </h2>
        <p className="text-sm">
          The following users have access to this project:
        </p>
      </div>

      {
         (isCommunityLoading  && isDietLoading && isEthnicityLoading && isHeightLoading && isMaritalStatusLoading  && isOccupationLoading && isOccupationLoading && isReligionLoading && isSmokingHabbitLoading && isIncomeLoading && isOccupationLoading && isQualificationLoading) ? (
          <Loading/>
        ) : 


     

      <Form form={form} onFinish={handleFormSubmit} layout="vertical">
        <Form.Item
          label={
            <label
              style={{
                color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                fontStyle: "Proxima-Nova-Semibold",
                fontWeight: "bold",
              }}
            >
              Age
            </label>
          }
          style={{ marginBottom: 0 }}
        >
          <Row gutter={2}>
            <Col span={12}>
              <Form.Item name="ageMin">
                <Select placeholder="Select minimum age" className="w-full">
                  {
                    Array.from({ length: 67 }, (_, index) => index + 18).map(
                      (number) => (
                        <Select.Option key={number} value={number.toString()}>
                          {number}
                        </Select.Option>
                      )
                    )

                  }
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="ageMax">
                <Select placeholder="Select maximum age" className="w-full">
                  {
                    Array.from({ length: 67 }, (_, index) => index + 18).map(
                      (number) => (
                        <Select.Option key={number} value={number.toString()}>
                          {number}
                        </Select.Option>
                      )
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          label={
            <label
              style={{
                color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                fontStyle: "Proxima-Nova-Semibold",
                fontWeight: "bold",
              }}
            >
              Height
            </label>
          }
          style={{ marginBottom: 0 }}
        >
          <Row gutter={2} className="w-full">
            <Col span={12}>
              <Form.Item name="heightMin">
                <Select placeholder="Select minimum height" className="w-full">
                  {
                    height.map((value) => (
                      <Select.Option key={value.id} value={value.value}>
                        {value.value}
                      </Select.Option>
                    ))

                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="heightMax">
                <Select placeholder="Select maximum height" className="w-full">
                  {
                    height.map((value) => (
                      <Select.Option key={value.id} value={value.value}>
                        {value.value}
                      </Select.Option>
                    ))

                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name={"income"}
          label={
            <label
              style={{
                color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                fontStyle: "Proxima-Nova-Semibold",
                fontWeight: "bold",
              }}
            >
              Income
            </label>
          }
        >
          <Select placeholder="Select  income">
            {
              income.map((value) => (
                <Select.Option key={value.id} value={value.value}>
                  {value.value}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="maritalStatus"
          label={
            <label
              style={{
                color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                fontStyle: "Proxima-Nova-Semibold",
                fontWeight: "bold",
              }}
            >
              Has Children
            </label>
          }
          className="h-auto rounded bg-[#EAF2FF] p-4"
        >
          <Radio.Group className="space-y-2" onChange={handleRadioChange}>
            <Radio
              value="no"
              style={{ flexDirection: "row-reverse", alignItems: "center" }}
              className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${selectedRadio === "no"
                ? "border border-[#007EAF] text-[#53389E]"
                : ""
                }`}
            >
              I don&apos;t mind
            </Radio>
            <Radio
              value="yes"
              style={{ flexDirection: "row-reverse", alignItems: "center" }}
              className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${selectedRadio === "yes"
                ? "border border-[#007EAF] text-[#53389E]"
                : ""
                }`}
            >
              No, matches shouldn&apos;t have children
            </Radio>

            <Radio
              value="notInHousehold"
              style={{ flexDirection: "row-reverse", alignItems: "center" }}
              className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${selectedRadio === "notInHousehold"
                ? "border border-[#007EAF] text-[#53389E]"
                : ""
                }`}
            >
              Yes, matches should have children
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="religion"
          label={
            <label
              style={{
                color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                fontStyle: "Proxima-Nova-Semibold",
                fontWeight: "bold",
              }}
            >
              Religion
            </label>
          }
          className="h-auto rounded bg-[#EAF2FF] p-4"
        >
          <Checkbox.Group
            className="space-x-2 space-y-2"
            onChange={handleCheckboxChange}
          >

            {
              [
                // { name: "All", value: "all" },
                ...religion
              ].map((rel) => (
                <Checkbox
                  style={{ flexDirection: "row-reverse", alignItems: "center" }}
                  value={rel.value}
                  className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${checkedValues.includes(rel.value)
                    ? "border border-[#007EAF] text-[#53389E]"
                    : ""
                    }`}
                >
                  {rel.value}
                </Checkbox>
              ))
            }

          </Checkbox.Group>
        </Form.Item>
        <Row >
          <Col >
            <Form.Item
              name={"ethnicity"}
              label={
                <label
                  style={{
                    color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                    fontStyle: "Proxima-Nova-Semibold",
                    fontWeight: "bold",
                  }}
                >
                  Ethnicity
                </label>
              }
              className="h-auto rounded bg-[#EAF2FF] p-4"
            >
              <Checkbox.Group
                className="gap-4"
                onChange={handleCheckboxChange}
              >

                {
                  [

                    // { value: "All" },
                    ...ethnicity

                  ].map((eth) => (
                    <Checkbox
                      style={{ flexDirection: "row-reverse", alignItems: "center" }}
                      value={eth.value}
                      className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${checkedValues.includes(eth.value)
                        ? "border border-[#007EAF] text-[#53389E]"
                        : ""
                        }`}
                    >
                      {eth.value}
                    </Checkbox>
                  ))
                }



              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col >
            <Form.Item
              name={"qualification"}
              label={
                <label
                  style={{
                    color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                    fontStyle: "Proxima-Nova-Semibold",
                    fontWeight: "bold",
                  }}
                >
                  Highest Qualification
                </label>
              }
              className="h-auto rounded bg-[#EAF2FF] p-4"
            >
              <Checkbox.Group
                className="gap-4"
                onChange={handleCheckboxChange}
              >


                {
                  [
                    // { value : "All" },
                    ...qualification.filter(value => !value.value.startsWith("--"))

                  ]
                    .map((qual) => (

                      <Checkbox
                        style={{ flexDirection: "row-reverse", alignItems: "center" }}
                        value={qual.value}
                        className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${checkedValues.includes(qual.value)
                          ? "border border-[#007EAF] text-[#53389E]"
                          : ""
                          }`}
                      >
                        {qual.value}
                      </Checkbox>


                    ))

                }


              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name={"smokingHabits"}
          label={
            <label
              style={{
                color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                fontStyle: "Proxima-Nova-Semibold",
                fontWeight: "bold",
              }}
            >
              Smoking Habits
            </label>
          }
          className="h-auto rounded bg-[#EAF2FF] p-4"
        >
          <Radio.Group className="space-y-2" onChange={handleRadioChange}>

            {
              [
                // {
                //   value: "All",
                // },
                ...smokingHabits
              ]
                .map((smoke) => (
                  <Radio
                    value={smoke.value}
                    style={{ flexDirection: "row-reverse", alignItems: "center" }}
                    className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${selectedRadio === smoke.value
                      ? "border border-[#007EAF] text-[#53389E]"
                      : ""
                      }`}
                  >
                    {smoke.value}
                  </Radio>
                ))
            }
          </Radio.Group>
        </Form.Item>

        <Col

          style={{ display: "flex", flexDirection: "column" }}
        >
          <Form.Item
            name={"occupation"}
            label={
              <label
                style={{
                  color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                  fontStyle: "Proxima-Nova-Semibold",
                  fontWeight: "bold",
                }}
              >
                Working As
              </label>
            }
            className="h-full flex-grow rounded bg-[#EAF2FF] p-4"
          >
            <Checkbox.Group
              className="gap-4"
              onChange={handleCheckboxChange}
            >

              {
                [
                  // { value: "All" },
                  ...occupation.filter(value => !value.value.startsWith("FREQUENTLY USED") && !value.value.startsWith("--"))
                ]
                  .map((occ) => (
                    <Checkbox
                      style={{ flexDirection: "row-reverse", alignItems: "center" }}
                      value={occ.value}
                      className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${checkedValues.includes(occ.value)
                        ? "border border-[#007EAF] text-[#53389E]"
                        : ""
                        }`}
                    >
                      {occ.value}
                    </Checkbox>
                  ))

              }


            </Checkbox.Group>
          </Form.Item>
        </Col>


        <Row gutter={20} style={{ display: "flex", flexWrap: "wrap" }}>

          <Col
            xs={24}
            sm={12}
            md={16}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Form.Item
              name={"maritalStatus"}
              label={
                <label
                  style={{
                    color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                    fontStyle: "Proxima-Nova-Semibold",
                    fontWeight: "bold",
                  }}
                >
                  Martial Status
                </label>
              }
              className="h-full flex-grow rounded bg-[#EAF2FF] p-4"
            >
              <Checkbox.Group
                className="gap-4"
                onChange={handleCheckboxChange}
              >

                {
                  [
                    // { value: "All" },
                    ...maritalStatus
                  ].map((marital) => (
                    <Checkbox
                      style={{ flexDirection: "row-reverse", alignItems: "center" }}
                      value={marital.value}
                      className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${checkedValues.includes(marital.value)
                        ? "border border-[#007EAF] text-[#53389E]"
                        : ""
                        }`}
                    >
                      {marital.value}
                    </Checkbox>
                  ))
                }
              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Form.Item
              name={"eatingHabits"}
              label={
                <label
                  style={{
                    color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                    fontStyle: "Proxima-Nova-Semibold",
                    fontWeight: "bold",
                  }}
                >
                  Eating Habits
                </label>
              }
              className="h-full flex-grow rounded bg-[#EAF2FF] p-4"
            >
              <Checkbox.Group
                className="gap-4"
                onChange={handleCheckboxChange}
              >

                {
                  [
                    // { value: "All" },
                    ...diet
                  ].map((diet) => (
                    <Checkbox
                      style={{ flexDirection: "row-reverse", alignItems: "center" }}
                      value={diet.value}
                      className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${checkedValues.includes(diet.value)
                        ? "border border-[#007EAF] text-[#53389E]"
                        : ""
                        }`}
                    >
                      {diet.value}
                    </Checkbox>
                  ))
                }
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name={"caste"}
          label={
            <label
              style={{
                color: `${isExclusive ? "#60457E" : "#007EAF"}`,
                fontStyle: "Proxima-Nova-Semibold",
                fontWeight: "bold",
              }}
            >
              Community
            </label>
          }
          className="h-auto rounded bg-[#EAF2FF] p-4"
        >
          <Checkbox.Group className=" gap-4" onChange={handleCheckboxChange}>

            {
              [
                // { value: "All" },
                ...communities.filter((value) => !value.value.includes("Frequently used Communities")),
              ].map((community) => (
                <Checkbox
                  key={community.value}
                  style={{ flexDirection: "row-reverse", alignItems: "center" }}
                  value={community.value}
                  className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${checkedValues.includes(community.value)
                    ? "border border-[#007EAF] text-[#53389E]"
                    : ""
                    }`}
                >
                  {community.value}
                </Checkbox>
              ))
            }

          </Checkbox.Group>
        </Form.Item>
        {/* <Form.Item className="rounded-md border border-[#E4E7EC] p-4">
          <Row align="middle" justify="space-between">
            <Col className="flex items-center">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F4EBFF] p-4 text-[#007EAF]">
                <span>
                  <FiLayers className="text-2xl" />
                </span>
              </div>
              <span
                className={`rounded-md bg-[#ffff] p-1 text-[#344054] ${
                  selectedRadio === "relative"
                    ? "border border-[#007EAF] text-[#53389E]"
                    : ""
                }`}
              >
                Relative
              </span>
            </Col>
            <Col>
              <Radio
                onChange={handleRadioChange}
                value="relative"
                style={{ marginLeft: "auto" }}
              />
            </Col>
          </Row>
        </Form.Item> */}
      </Form>
       }
    </Modal>
  );
};

export default DiscoverModal;
